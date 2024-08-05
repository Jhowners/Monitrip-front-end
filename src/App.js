import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ModalRegistrar from './Components/ModalRegistrar';
import RegistrarVeiculo from './RegistrarVeiculos';
import Bilhetes from './Bilhetes';
import Clientes from './Clientes';
import Bilhetesv2 from './Bilhetesv2';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('authToken'); // Verificar se o usuário está autenticado

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login />: <Navigate to="/login" />} />
          <Route path="/register" element={!isAuthenticated ? <ModalRegistrar /> : <Navigate to="/login" />} />
          {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}
          <Route path="/registrarveiculos" element={isAuthenticated ? <RegistrarVeiculo /> : <Navigate to="/login" />} />
          <Route path="/bilhetes" element={isAuthenticated ? <Bilhetes /> : <Navigate to="/login" />} />
          <Route path="/bilhetesv2" element={isAuthenticated ? <Bilhetesv2 /> : <Navigate to="/login" />} />
          <Route path="/empresas" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/empresas" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

