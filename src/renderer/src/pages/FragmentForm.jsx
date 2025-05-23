import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './FragmentForm.css'

export default function FragmentForm({ onSave}) {
  const navigate = useNavigate()
  const location = useLocation()
  const fragment = location.state?.fragment

  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    if (fragment) {
      setTitle(fragment.title || '')
      setCode(fragment.code || '')
      setTags(fragment.tags?.join(', ') || '')
    }
  }, [fragment])

  const handleSave = () => {
    if (!title.trim() || !code.trim()) return
    const newFragment = {
      id: fragment?.id || Date.now(),
      title,
      code,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    onSave(newFragment)
    navigate('/fragments')
  }

 


  return (
    <div className="fragment-form">

      <label>Title</label>
      <input
        type="text"
        placeholder="Name the fragment"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Code</label>
      <textarea
        placeholder="Your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="6"
      />

      <label>Tags</label>
      <input
        type="text"
        placeholder="React, Redux"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="form-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => navigate('/fragments')}> Cancel</button>
      </div>
    </div>
  )
}
