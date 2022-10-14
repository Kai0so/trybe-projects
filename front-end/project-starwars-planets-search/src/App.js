import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <div>
      <main>
        <PlanetProvider>
          <Table />
        </PlanetProvider>
      </main>
    </div>
  );
}

export default App;
