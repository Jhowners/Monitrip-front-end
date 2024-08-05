import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaCar, FaTaxi, FaTicketAlt, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import '../css/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout acionado'); // Para depuração
    sessionStorage.removeItem('authToken');
    console.log('Token removido'); // Para depuração
    navigate('/login');
    console.log('Redirecionando para /login'); // Para depuração
  };

  return (
    <header className="dashboard-header">
      <h1>ANTT</h1>
      <nav>
        <Link to="/Dashboard"><FaUsers /> Clientes</Link>
        <Link to="/registrarveiculos"><FaCar /> Veículos</Link>
        <Link to="/motoristas"><FaTaxi /> Motoristas</Link>
        <Link to="/bilhetes"><FaTicketAlt /> Bilhetes</Link>
        <Link to="/localizacao"><FaMapMarkerAlt /> Localização</Link>
      </nav>
      <div className="user-info">
        <button onClick={handleLogout}><FaSignOutAlt /> Sair</button>
      </div>
    </header>
  );
};

export default NavBar;
