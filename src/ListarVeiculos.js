import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './Components/NavBar';
import './css/ListarVeiculos.css';

const ListarVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');

  useEffect(() => {
    const fetchVeiculos = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/veiculos', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });
        setVeiculos(response.data);

        // Extrair empresas únicas dos veículos
        const empresasUnicas = [...new Set(response.data.map((veiculo) => veiculo.empresa.name))];
        setEmpresas(empresasUnicas);
      } catch (error) {
        console.error('Erro ao buscar veículos', error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/veiculos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
    } catch (error) {
      console.error('Erro ao deletar veículo', error);
    }
  };

  const handleEmpresaChange = (event) => {
    setEmpresaSelecionada(event.target.value);
  };

  const veiculosFiltrados = empresaSelecionada
    ? veiculos.filter((veiculo) => veiculo.empresa.name === empresaSelecionada)
    : veiculos;

  return (
    <div className="listar-veiculos-container">
      <NavBar />
      <div className="listar-veiculos-content">
        <h2>Veículos</h2>

        {/* Dropdown de empresas */}
        <select value={empresaSelecionada} onChange={handleEmpresaChange} className="empresa-dropdown">
          <option value="">Todas as Empresas</option>
          {empresas.map((empresa) => (
            <option key={empresa} value={empresa}>
              {empresa}
            </option>
          ))}
        </select>
        <div>

        <Link to="/adicionar-veiculo" className="add-button">Adicionar Veículo</Link>
        </div>

        <table className="veiculos-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Capacidade</th>
              <th>Ano de Fabricação</th>
              <th>Status</th>
              <th>Marca</th>
              <th>Celular</th>
              <th>Empresa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculosFiltrados.map((veiculo) => (
              <tr key={veiculo.id}>
                <td>{veiculo.placa}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.capacidade}</td>
                <td>{veiculo.ano_fabricacao}</td>
                <td>{veiculo.status}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.celular.numero}</td>
                <td>{veiculo.empresa.name}</td>
                <td>
                  <Link to={`/editar-veiculo/${veiculo.id}`} className="edit-button">Editar</Link>
                  <button onClick={() => handleDelete(veiculo.id)} className="delete-button">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarVeiculos;
