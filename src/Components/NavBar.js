import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCar, FaTaxi, FaTicketAlt, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import '../css/NavBar.css';

const NavBar = ({ onLogout }) => {
  return (
    <header className="dashboard-header">
      <h1>Menu</h1>
      <nav>
        <Link to="/clientes"><FaUsers /> Clientes</Link>
        <Link to="/registrarveiculos"><FaCar /> Veículos</Link>
        <Link to="/motoristas"><FaTaxi /> Motoristas</Link>
        <Link to="/vendas"><FaTicketAlt /> Vendas de Passagens</Link>
        <Link to="/localizacao"><FaMapMarkerAlt /> Localização</Link>
      </nav>
      <div className="user-info">
        <button onClick={onLogout}><FaSignOutAlt /> Logout</button>
      </div>
    </header>
  );
};

export default NavBar;
