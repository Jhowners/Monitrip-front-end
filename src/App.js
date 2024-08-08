import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ModalRegistrar from './Components/ModalRegistrar';
import RegistrarVeiculo from './Veiculos';
import Clientes from './Clientes';
import BilhetesBB from './BilhetesBB';
// import BilhetesBB from './BilhetesBBNotUsed';
// import BilhetesVR from './BilhetesVRNotUsed';
import BilhetesVR from './BilhetesVR';
import Motoristas from './Motoristas';
import ListarMotoristas from './ListarMotoristas';
import AdicionarMotorista from './AdicionarMotorista';
import AdicionarVeiculo from './AdicionarVeiculos';
import EditarMotorista from './EditarMotorista';
import EditarVeiculos from './EditarVeiculos';
import ListarVeiculos from './ListarVeiculos'

function App() {
  const isAuthenticated = !!sessionStorage.getItem('authToken'); // Verificar se o usuário está autenticado

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login />: <Navigate to="/login" />} />
          <Route path="/register" element={!isAuthenticated ? <ModalRegistrar /> : <Navigate to="/login" />} />
          <Route path="/empresas" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
          <Route path="/listar-veiculos" element={isAuthenticated ? <ListarVeiculos /> : <Navigate to="/login" />} />
          <Route path="/bilhetesBB" element={isAuthenticated ? <BilhetesBB /> : <Navigate to="/login" />} />
          <Route path="/bilhetesVR" element={isAuthenticated ? <BilhetesVR /> : <Navigate to="/login" />} />
          {/* <Route path="/bilhetesBBv2" element={isAuthenticated ? <BilhetesBBv2 /> : <Navigate to="/login" />} />
          <Route path="/bilhetesVRv2" element={isAuthenticated ? <BilhetesVRv2 /> : <Navigate to="/login" />} /> */}
          <Route path="/motoristas" element={isAuthenticated ? <Motoristas /> : <Navigate to="/login" />} />
          <Route path="/listar-motoristas" element={isAuthenticated ? <ListarMotoristas /> : <Navigate to="/login" />} />
          <Route path="/adicionar-motorista" element={isAuthenticated ? <AdicionarMotorista /> : <Navigate to="/login" />} />
          <Route path="/editar-motorista/:id" element={isAuthenticated ? <EditarMotorista /> : <Navigate to="/login" />} />
          <Route path="/editar-veiculo/:id" element={isAuthenticated ? <EditarVeiculos /> : <Navigate to="/login" />} />
          <Route path="/adicionar-veiculo" element={isAuthenticated ? <AdicionarVeiculo /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/empresas" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
