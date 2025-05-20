import React, { useState } from 'react'
import './Tags.css'

export default function Tags() {
  const [tags, setTags] = useState([
    { id: 1, name: 'React' },
    { id: 2, name: 'Redux' },
    { id: 3, name: 'State Manager' }
  ])

  const [newTag, setNewTag] = useState('')
  const [editingTag, setEditingTag] = useState(null)

  const handleAdd = () => {
    if (!newTag.trim()) return
    const newEntry = {
      id: Date.now(),
      name: newTag.trim()
    }
    setTags([...tags, newEntry])
    setNewTag('')
  }

  const handleDelete = (id) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  const handleEdit = (tag) => {
    setEditingTag(tag)
    setNewTag(tag.name)
  }

  const handleUpdate = () => {
    setTags(tags.map(tag =>
      tag.id === editingTag.id ? { ...tag, name: newTag.trim() } : tag
    ))
    setEditingTag(null)
    setNewTag('')
  }

  return (
    <div className="tags-page">
      <h2>Tags</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Enter tag name"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        {editingTag ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <ul className="tag-list">
        {tags.map(tag => (
          <li key={tag.id}>
            <span>{tag.name}</span>
            <button onClick={() => handleEdit(tag)}>Edit</button>
            <button onClick={() => handleDelete(tag.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
