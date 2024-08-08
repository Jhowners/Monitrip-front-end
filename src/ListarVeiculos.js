import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import './css/ListarVeiculos.css';

const ListarVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    const fetchVeiculos = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(GlobalUrl + '/veiculos', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setVeiculos(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículos', error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    try {
      await axios.delete(`${GlobalUrl}/veiculos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setVeiculos(veiculos.filter(veiculo => veiculo.id !== id));
    } catch (error) {
      console.error('Erro ao deletar veículo', error);
    }
  };

  return (
    <div className="listar-veiculos-container">
      <NavBar />
      <div className="listar-veiculos-content">
        <h2>Veículos</h2>
        <Link to="/adicionar-veiculo" className="add-button">Adicionar Veículo</Link>
        <table className="veiculos-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Capacidade</th>
              <th>Ano de Fabricação</th>
              <th>Status</th>
              <th>Marca</th>
              <th>Categoria CNH</th>
              <th>ID Celular</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map(veiculo => (
              <tr key={veiculo.id}>
                <td>{veiculo.placa}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.capacidade}</td>
                <td>{veiculo.ano_fabricacao}</td>
                <td>{veiculo.status}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.categoria_cnh}</td>
                <td>{veiculo.celular.id}</td>
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
