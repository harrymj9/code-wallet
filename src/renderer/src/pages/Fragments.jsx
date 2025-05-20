import React, { useState } from 'react';
//import './Fragments.css';

export default function Fragments({ fragments, onDelete, onEdit }) {
  const [selectedFragment, setSelectedFragment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState('');

  const openModal = (fragment) => {
    setSelectedFragment(fragment);
    setEditedCode(fragment.code);
    setIsEditing(false);
  };

  const closeModal = () => {
    setSelectedFragment(null);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFragment.code);
    alert('Code copy!');
  };

  const handleDelete = () => {
    onDelete(selectedFragment.id);
    closeModal();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveEdit = () => {
    onEdit(selectedFragment.id, editedCode);
    closeModal();
  };

  return (
    <div className="fragments-container">
      <h2>MY CODE FRAGMENT </h2>
      <div className="fragments-list">
        {fragments.map(fragment => (
          <div key={fragment.id} className="fragment-card" style={{ background: '#e3efff', padding: '1rem', marginBottom: '1rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{fragment.title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {fragment.tags && fragment.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: 'magenta',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '5px',
                      fontSize: '0.8rem'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p>{fragment.code.slice(0, 50)}...</p>
            <button onClick={() => openModal(fragment)}>👁️</button>
          </div>
        ))}
      </div>

      {selectedFragment && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedFragment.title}</h3>

            {isEditing ? (
              <textarea
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                rows={10}
                style={{ width: '100%' }}
              />
            ) : (
              <pre>{selectedFragment.code}</pre>
            )}

            <div className="modal-actions">
              {!isEditing ? (
                <>
                  <button onClick={handleCopy}>📋 Copy</button>
                  <button onClick={handleEdit}>✏️ Edit</button>
                  <button onClick={handleDelete}>🗑 Delete</button>
                </>
              ) : (
                <>
                  <button onClick={saveEdit}>💾 Save</button>
                  <button onClick={() => setIsEditing(false)}>❌ Delete</button>
                </>
              )}
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
