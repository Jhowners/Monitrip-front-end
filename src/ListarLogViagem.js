import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ListarLogViagem.css'; // Pode criar um novo arquivo CSS para essa página
import NavBar from './Components/NavBar';
import FormatarDataHoraListar from './Components/FormatarDataHoraListar';

const ListarLogViagem = () => {
  const [logs, setLogs] = useState([]);
  const [filtroEmpresa, setFiltroEmpresa] = useState(''); // Estado para armazenar o filtro do dropdown
  const [empresasDisponiveis, setEmpresasDisponiveis] = useState([]); // Estado para armazenar as empresas
  const [filtroPlacaVeiculo, setFiltroPlacaVeiculo] = useState(''); // Estado para armazenar o filtro de placa de veículo
  const [placasDisponiveis, setPlacasDisponiveis] = useState([]); // Estado para armazenar as placas de veículos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o token está presente
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login'; // Redireciona para login se o token não estiver presente
      return;
    }

    // Fazer requisição para buscar os dados do log
    axios.get(process.env.REACT_APP_API_URL + '/InserirLogInicioFimViagemRegular', {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => {
      setLogs(response.data);
      const empresas = [...new Set(response.data.map(log => log.empresa?.name).filter(Boolean))];
      setEmpresasDisponiveis(empresas);
      const placas = [...new Set(response.data.map(log => log.placaVeiculo).filter(Boolean))];
      setPlacasDisponiveis(placas);
      setLoading(false);
      
    })
    .catch(error => {
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
        <h2>Log de Viagens</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CNPJ</th>
              <th>Placa do Veículo</th>
              <th>CPF do Motorista</th>
              <th>Identificação da Linha</th>
              <th>Código do Tipo de Viagem</th>
              <th>Data Programada da Viagem</th>
              <th>Hora Programada da Viagem</th>
              <th>Tipo de Registro de Viagem</th>
              <th>Código do Sentido da Linha</th>
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
                <td>{log.cpfMotorista}</td>
                <td>{log.identificacaoLinha}</td>
                <td>{log.codigoTipoViagem}</td>
                <td>{log.dataProgramadaViagem}</td>
                <td>{log.horaProgramadaViagem}</td>
                <td>{log.tipoRegistroViagem}</td>
                <td>{log.codigoSentidoLinha}</td>
                <td>{log.latitude}</td>
                <td>{log.longitude}</td>
                <td>{log.pdop}</td>
                <td> <FormatarDataHoraListar dataHora={log.dataHoraEvento}/></td>
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

export default ListarLogViagem;
