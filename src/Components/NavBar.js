import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaCar, FaTaxi, FaTicketAlt, FaMapMarkerAlt, FaSignOutAlt, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import '../css/NavBar.css';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const handleRedirect = (path) => {
    navigate(path);  // Redireciona para a rota passada
  };

  return (
    <header className="dashboard-header">
      <nav className="nav-bar">
        <Link to="/empresas" className="nav-link"><FaUsers /> Clientes</Link>
        <Link to="/listar-veiculos" className="nav-link"><FaCar /> Veículos</Link>
        <Link to="/listar-motoristas" className="nav-link"><FaTaxi /> Motoristas</Link>
        <Link to="/bilhetesBB" className="nav-link"><FaTicketAlt /> Brasil Bus</Link>
        <Link to="/bilhetesVR" className="nav-link"><FaTicketAlt /> Estrela VR</Link>
        <Link to="/listar-telefones" className="nav-link"><FaPhoneAlt /> Celular</Link>

        <div
          className="dropdown-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/velocidade-tempo-localizacao" className="nav-link">
            <FaMapMarkerAlt /> Velocidade Localização <FaChevronDown className="dropdown-icon" />
          </Link>

          {showDropdown && (
            <div className="dropdown-menu">
              {/* Chamando a função de redirecionamento com o caminho desejado */}
              <button onClick={() => handleRedirect('/evento-motorista')}>Jornada de Trabalho Motorista</button>
              <button onClick={() => handleRedirect('/motivo-parada')}>Detector de Parada</button>
              <button onClick={() => handleRedirect('/iniciofim-viagem')}>Início Fim Viagem Regular</button>
              <button onClick={() => handleRedirect('/bilhete-embarque')}>Bilhete Embarque</button>
            </div>
          )}
        </div>

        <button className="logout-button" onClick={handleLogout}><FaSignOutAlt /> Sair</button>
      </nav>
    </header>
  );
};

export default NavBar;
