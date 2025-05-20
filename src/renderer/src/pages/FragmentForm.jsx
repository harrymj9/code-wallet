import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FragmentForm.css'

export default function FragmentForm({ onSave, onDelete, initialData = {} }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState(initialData.title || '')
  const [code, setCode] = useState(initialData.code || '')
  const [tags, setTags] = useState(initialData.tags || [])

  const handleSave = () => {
    if (!title.trim() || !code.trim()) return
    const newFragment = {
      id: initialData.id || Date.now(),
      title,
      code,
      tags
    }
    onSave(newFragment)
    navigate('/fragments')  
  }

  const handleDelete = () => {
    if (initialData.id && onDelete) {
      onDelete(initialData.id)
    }
    navigate('/fragments')
  }

  //const handleInfo = () => { navigate('/info')}

  return (
    <div className="fragment-form">
      <h2>Form</h2>

      <label>Title</label>
      <input
        type="text"
        placeholder="Name the fragment"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Code</label>
      <textarea
        placeholder="your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="6"
      />

      <label>Tags</label>
      <input
        type="text"
        placeholder="React, Redux"
        value={tags.join(', ')}
        onChange={(e) =>
          setTags(
            e.target.value
              .split()
              .map(t => t.trim())
              .filter(Boolean)
          )
        }
      />

      <div className="buttons">
        <button onClick={handleSave}>Sauvegarder</button>
        {initialData.id && <button onClick={handleDelete}>Supprimer</button>}
        {/* <button onClick={handleInfo}>Info</button>*/}
      </div>
    </div>
  )
}

 
