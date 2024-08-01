import React from 'react';
import { FaUsers, FaCar, FaTaxi, FaTicketAlt, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import './css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const token = localStorage.getItem('authToken');
  if (!token) {
    // Redireciona para o login se não estiver autenticado
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Administrativo</h1>
        <nav>
          <a href="/clientes"><FaUsers /> Clientes</a>
          <a href="/veiculos"><FaCar /> Veículos</a>
          <a href="/motoristas"><FaTaxi /> Motoristas</a>
          <a href="/vendas"><FaTicketAlt /> Vendas de Passagens</a>
          <a href="/localizacao"><FaMapMarkerAlt /> Localização</a>
        </nav>
        <div className="user-info">
          <span>Usuário: Admin</span>
          <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </header>
      
      <main className="dashboard-main">
        <section className="dashboard-summary">
          <div className="summary-item">
            <FaUsers /> Clientes: 150
          </div>
          <div className="summary-item">
            <FaCar /> Veículos: 50
          </div>
          <div className="summary-item">
            <FaTaxi /> Motoristas: 30
          </div>
          <div className="summary-item">
            <FaTicketAlt /> Passagens Vendidas: 2000
          </div>
        </section>
        
        <section className="dashboard-activities">
          <h2>Atividades Recentes</h2>
          <ul>
            <li>Novo cliente cadastrado: EstrelaRondonia</li>
            <li>Veículo com IMEI atualizado: Placa XYZ-1234</li>
            <li>Motorista cadastrado: João Silva</li>
          </ul>
        </section>
        
        <section className="dashboard-visualizations">
          <h2>Vendas de Passagens</h2>
          <div className="chart">Gráfico de Vendas</div>
          
          <h2>Localização dos Veículos</h2>
          <div className="map">Mapa Interativo</div>
        </section>
      </main>
      
      <footer className="dashboard-footer">
        <p>Suporte: contato@empresa.com</p>
        <p><a href="/documentacao">Documentação</a></p>
      </footer>
    </div>
  );
};

export default Dashboard;
