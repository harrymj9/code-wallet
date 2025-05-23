import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Fragments from './pages/Fragments';
import Tags from './pages/Tags';
import Info from './components/Info';
import FragmentForm from './pages/FragmentForm';
import { db } from "./firebase";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";


function App() {
  //  pour stocker les fragments
  const [fragments, setFragments] = useState([]);

  //  pour gérer le dark mode
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Charger les fragments depuis Firestore au démarrage
  useEffect(() => {
    fetchFragments();
  }, []);

  // Fonction pour récupérer les fragments depuis Firestore
  const fetchFragments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "fragments")); // récupération de tous les documents
      const fetchedFragments = querySnapshot.docs.map(doc => ({
        id: doc.id,              // On ajoute l’ID du document Firestore
        ...doc.data(),           // Et toutes les autres données
      }));
      setFragments(fetchedFragments); // Mise à jour de l’état local
    } catch (error) {
      console.error("Erreur lors de la récupération des fragments :", error);
    }
  };

  // Fonction pour supprimer un fragment de l’état local pas encore firestore
  const handleDeleteFragment = async (id) => {
  try {
    // Suppression dans Firestore
    const docRef = doc(db, 'fragments', id);
    await deleteDoc(docRef);

    // Mise à jour de l’état local uniquement si la suppression Firestore a réussi
    setFragments(fragments.filter(frag => frag.id !== id));
  } catch (error) {
    console.error("Erreur lors de la suppression du fragment :", error);
  }
};

  // pour modifier le code d’un fragment localement
  const handleEditFragment = (id, newCode) => {
    setFragments(fragments.map(frag =>
      frag.id === id ? { ...frag, code: newCode } : frag
    ));
  };

  // pour enregistrer ou mettre à jour un fragment dans Firestore
  const handleSaveToFirestore = async (fragment) => {
    try {
      if (fragment.id && typeof fragment.id === 'string') {
        // on modifie un document existant
        const ref = doc(db, 'fragments', fragment.id);
        await updateDoc(ref, {
          title: fragment.title,
          code: fragment.code,
          tags: fragment.tags
        });
      } else {
        // on ajoute un nouveau document à la collection "fragments"
        const docRef = await addDoc(collection(db, 'fragments'), {
          title: fragment.title,
          code: fragment.code,
          tags: fragment.tags
        });
        fragment.id = docRef.id;
      }

      // Mise à jour de la liste locale des fragments 
      setFragments(prev =>
        prev.some(f => f.id === fragment.id)
          ? prev.map(f => f.id === fragment.id ? fragment : f) // Mise à jour
          : [...prev, fragment]                                 // Ajout
      );
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);//ici c'est pour éviter les crashs en cas de problème lors de l'enregistrement et à afficher une erreur utile dans la console pour que tu puisses la diagnostiquer.
    }
  };

  return (
    <Router>
     
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Routes>
          {/* redirection vers /fragments par défaut */}
          <Route path="/" element={<Navigate to="/fragments" />} />

          {/* page principale avec la liste des fragments */}
          <Route
            path="/fragments"
            element={
              <Fragments
                fragments={fragments}
                onDelete={handleDeleteFragment}
                onEdit={handleEditFragment}
              />
            }
          />
          <Route path="/tags" element={<Tags />} />
          <Route path="/info" element={<Info />} />
          <Route
            path="/new"
            element={<FragmentForm onSave={handleSaveToFirestore} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
