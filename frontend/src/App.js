import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonasPage from './pages/PersonasPage';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Redirigir la raíz '/' a '/personas' automáticamente */}
        <Route path="/" element={<Navigate to="/personas" replace />} />

        {/* Ruta principal donde está nuestra tabla */}
        <Route path="/personas" element={<PersonasPage />} />
      </Routes>
    </div>
  );
};

export default App;