import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Fragments from './pages/Fragments'
import Tags from './pages/Tags'
import Info from './components/Info'
import FragmentForm from './pages/FragmentForm'

function App() {
  const [fragments, setFragments] = useState([])


  // For the dark mode
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleAddFragment = (newFragment) => {
    setFragments([...fragments, newFragment])
  }

  const handleDeleteFragment = (id) => {
    setFragments(fragments.filter(frag => frag.id !== id))
  }

  const handleEditFragment = (id, newCode) => {
    setFragments(fragments.map(frag =>
      frag.id === id ? { ...frag, code: newCode } : frag
    ))
  }

  return (
    <Router>
      {/* the props this dark mode for the header*/}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/fragments" />} />
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
          <Route path="/new" element={<FragmentForm onSave={handleAddFragment} />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
