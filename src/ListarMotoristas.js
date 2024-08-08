import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import './css/ListarMotoristas.css';

const ListarMotoristas = () => {
  const [motoristas, setMotoristas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotoristas = async () => {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get(GlobalUrl + '/motoristas', {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setMotoristas(response.data);
    };
    fetchMotoristas();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    try {
      await axios.delete(`${GlobalUrl}/motoristas/${id}`, {
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

  return (
    <div className="listar-motoristas-container">
      <NavBar />
      <div className="listar-motoristas-content">
        <h2>Motoristas</h2>
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
              <th>Empresa ID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {motoristas.map(motorista => (
              <tr key={motorista.id}>
                <td>{motorista.name}</td>
                <td>{motorista.cpf}</td>
                <td>{motorista.data_nascimento}</td>
                <td>{motorista.numero_cnh}</td>
                <td>{motorista.categoria_cnh}</td>
                <td>{motorista.status}</td>
                <td>{motorista.empresa.id}</td>
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
