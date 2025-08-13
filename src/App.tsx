// frontend/src/App.tsx
import React from 'react';
import Auth from './components/Auth';
import './index.css'; // Assuming your global styles are here
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;