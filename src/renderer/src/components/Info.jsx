import React from 'react';

export default function Info() {
  return (
    <div className="info-page" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>About Code Wallet</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>1. Features</h2>
        <ul>
          <li> Save reusable code snippets</li>
          <li> Assign tags to fragments</li>
          <li>Add, edit, and delete fragments</li>
          <li>Toggle between light and dark mode</li>
          <li> Navigate between app sections</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>2. Developer Information</h2>
        <p>
          This application was developed by DIEUDONNE MONDE, a student at the school multimedia, as part of a pedagogical project.
        </p>
        <p>
          GitHub Repository: <a href="https://github.com/harrymj9/code-wallet" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>3. Legal & Data Management</h2>
        <p>
          Code Wallet does not collect any personal data. All data is stored locally in the node json db.
        </p>
        <p>
          If the app is extended in the future to include authentication or database storage, it will fully comply with GDPR (General Data Protection Regulation) standards.
        </p>
      </section>
    </div>
  );
}
