import React, { useEffect, useState } from 'react';
import './Tags.css';
import { db } from '../firebase';
import { collection, getDocs,addDoc, updateDoc,deleteDoc, doc} from 'firebase/firestore'; 

export default function Tags() {
  // les tags stockés localement
  const [tags, setTags] = useState([]);

  // pour ouvrir ou fermer la modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  //tag sélectionné pour édition ou ajout
  const [currentTag, setCurrentTag] = useState({ id: null, name: '' });

  // référence à la collection "tags" dans Firestore
  const tagsCollection = collection(db, 'tags');

  //  chargement des tags depuis Firestore au démarrage du composant
  useEffect(() => {
    const fetchTags = async () => {
      const snapshot = await getDocs(tagsCollection); // récupère les documents
      const fetchedTags = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTags(fetchedTags); //la mise à jour de l'état local
    };
    fetchTags();
  }, []); //exécuter une seule fois

  //ouvrir la modale (pour ajouter ou modifier)
  const openModal = (tag = { id: null, name: '' }) => {
    setCurrentTag(tag);
    setIsModalOpen(true);
  };

  //fermerture de la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTag({ id: null, name: '' });
  };

  //mise à jour du nom dans le champ de formulaire
  const handleChange = (e) => {
    setCurrentTag({ ...currentTag, name: e.target.value });
  };

  //sauvegarde un nouveau tag ou mettre à jour un tag existant
  const handleSave = async () => {
    if (!currentTag.name.trim()) return;

    if (currentTag.id) {
      //  Si on a un id on met à jour le tag existant dans Firestore
      const ref = doc(db, 'tags', currentTag.id);
      await updateDoc(ref, { name: currentTag.name });

      // mise à jour localement
      setTags(tags.map(tag =>
        tag.id === currentTag.id ? { ...tag, name: currentTag.name } : tag
      ));
    } else {
      const docRef = await addDoc(tagsCollection, { name: currentTag.name });
      setTags([...tags, { id: docRef.id, name: currentTag.name }]);
    }
    closeModal();
  };

  //supprimer un tag
  const handleDelete = async () => {
    if (currentTag.id) {
      const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
      if (confirmDelete) {
        const ref = doc(db, 'tags', currentTag.id);
        await deleteDoc(ref); // le supprime dans firestore
        setTags(tags.filter(tag => tag.id !== currentTag.id));
        closeModal();
      }
    }
  };

  return (
    <div className="tags-page">
      <h2>Tags</h2>
      <button onClick={() => openModal()}>New</button>

      {/*liste des tags cliquables */}
      <ul className="tag-list">
        {tags.map(tag => (
          <li key={tag.id} onClick={() => openModal(tag)} className="tag-item">
            {tag.name}
          </li>
        ))}
      </ul>

      {/* la petite fenêtre modale d'ajout / modification */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{currentTag.id ? 'Edit Tag' : 'New Tag'}</h3>
            <input
              type="text"
              value={currentTag.name}
              onChange={handleChange}
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              {/* le bouton pour supprimer si on modifie */}
              {currentTag.id && (
                <button onClick={handleDelete}>Delete</button>
              )}
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
