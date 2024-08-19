import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaCar, FaTaxi, FaTicketAlt, FaMapMarkerAlt, FaSignOutAlt, FaPhoneAlt } from 'react-icons/fa';
import '../css/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <h1>Monitrip Menu</h1>
      <nav>
        <Link to="/empresas"><FaUsers /> Clientes</Link>
        <Link to="/listar-veiculos"><FaCar /> Veículos</Link>
        <Link to="/listar-motoristas"><FaTaxi /> Motoristas</Link>

        <Link to="/bilhetesBB"><FaTicketAlt /> Brasil Bus</Link>
        <Link to="/bilhetesVR"><FaTicketAlt /> Estrela VR</Link>
        <Link to="/listar-telefones"><FaPhoneAlt />Celular</Link>
{/* 
        <Link to="/bilhetesBBv2"><FaTicketAlt /> BilhetesBBVersao2</Link>
        <Link to="/bilhetesVRv2"><FaTicketAlt /> BilhetesVRVersao2</Link> */}

        <Link to="/localizacao"><FaMapMarkerAlt /> Localização</Link>
      </nav>
      <div className="user-info">
        <button onClick={handleLogout}><FaSignOutAlt /> Sair</button>
      </div>
    </header>
  );
};

export default NavBar;
