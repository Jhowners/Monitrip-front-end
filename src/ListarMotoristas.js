import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import FormatarDataListar from './Components/FormatarDataListar';
import './css/ListarMotoristas.css';
import FormatarCpf from './Components/FormatarCpf'

const ListarMotoristas = () => {
  const [motoristas, setMotoristas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotoristas = async () => {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/motoristas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setMotoristas(response.data);
    };

    const fetchEmpresas = async () => {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/empresas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setEmpresas(response.data);
    };

    fetchMotoristas();
    fetchEmpresas();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/motoristas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setMotoristas(motoristas.filter(motorista => motorista.id !== id));
    } catch (error) {
      console.error('Error deleting driver', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-motorista/${id}`);
  };

  const handleEmpresaChange = (e) => {
    setEmpresaSelecionada(e.target.value);
  };

  // Filtra os motoristas pela empresa selecionada
  const motoristasFiltrados = empresaSelecionada
    ? motoristas.filter(motorista => motorista.empresa.id === parseInt(empresaSelecionada))
    : motoristas;

  return (
    <div className="listar-motoristas-container">
      <NavBar />
      <div className="listar-motoristas-content">
        <h2>Motoristas</h2>

        {/* Dropdown para selecionar empresa */}
        <div className="empresa-filter">
          <label htmlFor="empresa"></label>
          <select id="empresa" value={empresaSelecionada} onChange={handleEmpresaChange}>
            <option value="">Todas as Empresas</option>
            {empresas.map(empresa => (
              <option key={empresa.id} value={empresa.id}>{empresa.name}</option>
            ))}
          </select>
        </div>
        <div>
          
        </div>
        <Link to="/adicionar-motorista" className="add-button">Adicionar Motorista</Link>

        <table className="motoristas-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Número CNH</th>
              <th>Categoria CNH</th>
              <th>Status</th>
              <th>Empresa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {motoristasFiltrados.map(motorista => (
              <tr key={motorista.id}>
                <td>{motorista.name}</td>
                <td><FormatarCpf cpf={motorista.cpf} /></td>
                <td><FormatarDataListar data={motorista.data_nascimento} /></td>
                <td>{motorista.numero_cnh}</td>
                <td>{motorista.categoria_cnh}</td>
                <td>{motorista.status}</td>
                <td>{motorista.empresa.name}</td>
                <td>
                  <button onClick={() => handleEdit(motorista.id)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(motorista.id)} className="delete-button">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarMotoristas;
