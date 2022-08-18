import React from 'react';
import './App.css';
import TableSection from './components/TableSection';
import projectIntro from './projectIntro.gif';

function App() {
  return (
    <main>
      <section>
        <img src={ projectIntro } alt="star wars logo" />
      </section>
      <TableSection />
    </main>
  );
}

export default App;
