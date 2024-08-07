import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ModalRegistrar from './Components/ModalRegistrar';
import RegistrarVeiculo from './RegistrarVeiculos';
import Clientes from './Clientes';
import BilhetesBB from './BilhetesBB';
import BilhetesBBv2 from './BilhetesBBv2';
import BilhetesVR from './BilhetesVR';
import BilhetesVRv2 from './BilhetesVRv2';
import Motoristas from './Motoristas';

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
          <Route path="/bilhetesBB" element={isAuthenticated ? <BilhetesBB /> : <Navigate to="/login" />} />
          <Route path="/bilhetesVR" element={isAuthenticated ? <BilhetesVR /> : <Navigate to="/login" />} />
          <Route path="/bilhetesBBv2" element={isAuthenticated ? <BilhetesBBv2 /> : <Navigate to="/login" />} />
          <Route path="/bilhetesVRv2" element={isAuthenticated ? <BilhetesVRv2 /> : <Navigate to="/login" />} />
          <Route path="/motoristas" element={isAuthenticated ? <Motoristas /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/empresas" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

