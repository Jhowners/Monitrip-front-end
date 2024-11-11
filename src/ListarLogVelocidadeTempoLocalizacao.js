import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ListarLogVelocidadeTempoLocalizacao.css';
import NavBar from './Components/NavBar';
import FormatarDataHoraListar from './Components/FormatarDataHoraListar';

const LogVelocidadeTempoLocalizacao = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEmpresa, setFiltroEmpresa] = useState(''); // Estado para armazenar o filtro do dropdown
  const [filtroPlacaVeiculo, setFiltroPlacaVeiculo] = useState(''); // Estado para armazenar o filtro de placa de veículo
  const [placasDisponiveis, setPlacasDisponiveis] = useState([]); // Estado para armazenar as placas de veículos
  const [empresasDisponiveis, setEmpresasDisponiveis] = useState([]); // Estado para armazenar as empresas

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios
      .get(process.env.REACT_APP_API_URL + '/InserirLogVelocidadeTempoLocalizacao', {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        setLogs(response.data);
        
        const empresas = [...new Set(response.data.map(log => log.empresa?.name).filter(Boolean))];
        setEmpresasDisponiveis(empresas);
        const placas = [...new Set(response.data.map(log => log.placaVeiculo).filter(Boolean))];
        setPlacasDisponiveis(placas);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching logs', error);
        setLoading(false);
      });
  }, []);

  // Filtrando os logs com base nos filtros de empresa e placa de veículo
  const logsFiltrados = logs.filter(log => {
    const filtrarPorEmpresa = filtroEmpresa ? log.empresa?.name === filtroEmpresa : true;
    const filtrarPorPlaca = filtroPlacaVeiculo ? log.placaVeiculo === filtroPlacaVeiculo : true;
    return filtrarPorEmpresa && filtrarPorPlaca;
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="logs-container">
      <NavBar />
      

      <select
          value={filtroEmpresa}
          onChange={(e) => setFiltroEmpresa(e.target.value)}
          className="filtro-dropdown"
        >
          <option value="">Todas as Empresas</option>
          {empresasDisponiveis.map((empresa, index) => (
            <option key={index} value={empresa}>
              {empresa}
            </option>
          ))}
        </select>

        <select
          value={filtroPlacaVeiculo}
          onChange={(e) => setFiltroPlacaVeiculo(e.target.value)}
          className="filtro-dropdown"
        >
          <option value="">Todas as Placas</option>
          {placasDisponiveis.map((placa, index) => (
            <option key={index} value={placa}>
              {placa}
            </option>
          ))}
        </select>

      <div className="logs-content">
        <h2>Log de Velocidade, Tempo e Localização</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CNPJ</th>
              <th>Placa do Veículo</th>
              <th>Velocidade Atual</th>
              <th>Distância Percorrida</th>
              <th>Situação Ignição Motor</th>
              <th>Situação Porta Veículo</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>PDOP</th>
              <th>Data e Hora do Evento</th>
              <th>IMEI</th>
              <th>Sequenciamento</th>
              <th>ID Viagem</th>
              <th>ID Transação</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltrados.map((log) => (
              <tr key={log.idLog}>
                <td>{log.idLog}</td>
                <td>{log.cnpjEmpresaTransporte}</td>
                <td>{log.placaVeiculo}</td>
                <td>{log.velocidadeAtual}</td>
                <td>{log.distanciaPercorrida}</td>
                <td>{log.situacaoIgnicaoMotor}</td>
                <td>{log.situacaoPortaVeiculo}</td>
                <td>{log.latitude}</td>
                <td>{log.longitude}</td>
                <td>{log.pdop}</td>
                <td><FormatarDataHoraListar dataHora={log.dataHoraEvento} /></td>
                <td>{log.imei}</td>
                <td>{log.sequenciamento}</td>
                <td>{log.idViagem}</td>
                <td>{log.idTransacao}</td>
                <td>{log.empresa?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogVelocidadeTempoLocalizacao;
