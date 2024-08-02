import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ModalRegistrar from './Components/ModalRegistrar';
import RegistrarVeiculo from './RegistrarVeiculos';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verificar se o usuário está autenticado

  return (
    <Router>
      <div className="App">
        <Routes>
        
          <Route path="/login" element={!isAuthenticated ? <Login />: <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <ModalRegistrar /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/registrarveiculos" element={isAuthenticated ? <RegistrarVeiculo /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
