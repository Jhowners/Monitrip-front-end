import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ListarBilheteEmbarque.css';
import NavBar from './Components/NavBar';
import FormatarDataHoraListar from './Components/FormatarDataHoraListar';

const ListarBilheteEmbarque = () => {
  const [logs, setLogs] = useState([]);
  const [filtroEmpresa, setFiltroEmpresa] = useState(''); // Estado para armazenar o filtro do dropdown
  const [empresasDisponiveis, setEmpresasDisponiveis] = useState([]); // Estado para armazenar as empresas
  const [filtroPlacaVeiculo, setFiltroPlacaVeiculo] = useState(''); // Estado para armazenar o filtro de placa de veículo
  const [placasDisponiveis, setPlacasDisponiveis] = useState([]); // Estado para armazenar as placas de veículos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Fazendo requisição para buscar os logs de transporte
    axios.get(process.env.REACT_APP_API_URL + '/InserirLogBilheteEmbarque', {
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
      console.error('Erro ao buscar os logs de transporte', error);
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
        <h2>Log de Bilhete Embarque</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CNPJ</th>
              <th>Placa do Veículo</th>
              <th>CPF do Motorista</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>PDOP</th>
              <th>Data e Hora do Evento</th>
              <th>IMEI</th>
              <th>Sequenciamento</th>
              <th>ID Viagem</th>
              <th>Número do Equipamento</th>
              <th>Número do Bilhete de Embarque</th>
              <th>Identificação da Linha</th>
              <th>ID Ponto Origem</th>
              <th>ID Ponto Destino</th>
              <th>Código Tipo de Serviço</th>
              <th>Data da Viagem</th>
              <th>Hora da Viagem</th>
              <th>Código Tipo de Viagem</th>
              <th>Número da Poltrona</th>
              <th>Plataforma de Embarque</th>
              <th>Código do Motivo do Desconto</th>
              <th>Valor da Tarifa</th>
              <th>Percentual de Desconto</th>
              <th>Alíquota ICMS</th>
              <th>Valor do Pedágio</th>
              <th>Valor da Taxa de Embarque</th>
              <th>Valor Total</th>
              <th>Nome do Passageiro</th>
              <th>Documento de Identificação</th>
              <th>CPF do Passageiro</th>
              <th>Celular do Passageiro</th>
              <th>ID Transação</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltrados.map(log => (
              <tr key={log.idLog}>
                <td>{log.idLog}</td>
                <td>{log.cnpjEmpresaTransporte}</td>
                <td>{log.placaVeiculo}</td>
                <td>{log.cpfMotorista}</td>
                <td>{log.latitude}</td>
                <td>{log.longitude}</td>
                <td>{log.pdop}</td>
                <td> <FormatarDataHoraListar dataHora={log.dataHoraEvento}/></td>
                <td>{log.imei}</td>
                <td>{log.sequenciamento}</td>
                <td>{log.idViagem}</td>
                <td>{log.numeroEquipamento}</td>
                <td>{log.numeroBilheteEmbarque}</td>
                <td>{log.identificacaoLinha}</td>
                <td>{log.idPontoOrigemViagem}</td>
                <td>{log.idPontoDestinoViagem}</td>
                <td>{log.codigoTipoServico}</td>
                <td>{log.dataViagem}</td>
                <td>{log.horaViagem}</td>
                <td>{log.codigoTipoViagem}</td>
                <td>{log.numeroPoltrona}</td>
                <td>{log.plataformaEmbarque}</td>
                <td>{log.codigoMotivoDesconto}</td>
                <td>{log.valorTarifa}</td>
                <td>{log.percentualDesconto}</td>
                <td>{log.aliquotaICMS}</td>
                <td>{log.valorPedagio}</td>
                <td>{log.valorTaxaEmbarque}</td>
                <td>{log.valorTotal}</td>
                <td>{log.nomePassageiro}</td>
                <td>{log.documentoIdentificacaoPassageiro}</td>
                <td>{log.cpfPassageiro}</td>
                <td>{log.celularPassageiro}</td>
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

export default ListarBilheteEmbarque;
