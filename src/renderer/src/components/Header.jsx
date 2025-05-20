
import React from 'react';
import { Link } from 'react-router-dom'; 

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/fragments">Code Wallet</Link>
      </h1>

      <nav className="nav">
        <Link to="/fragments"><button>Fragments</button></Link>
        <Link to="/tags"><button>Tags</button></Link>
        <Link to="/new"><button>New</button></Link>
        <Link to="/info"><button>Info</button></Link>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  );
}
