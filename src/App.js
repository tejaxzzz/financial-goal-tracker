import React, { useState, useEffect } from 'react';
import './App.css';
import { GoalProvider } from './context/GoalContext';
import GoalForm from './components/GoalForm';
import Dashboard from './components/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <GoalProvider>
      <div className="App">
        <button onClick={() => setDarkMode((prev) => !prev)} style={{ marginBottom: '10px' }}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <h1>Financial Goal Tracker</h1>
        <GoalForm />
        <Dashboard />
      </div>
    </GoalProvider>
  );
}

export default App;
