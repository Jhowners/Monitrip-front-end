import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ListarTelefone.css';
import NavBar from './Components/NavBar';

const ListarTelefones = () => {
  const [telefones, setTelefones] = useState([]);

  useEffect(() => {
    const fetchTelefones = async () => {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get(process.env.REACT_APP_API_URL + '/celulares', {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setTelefones(response.data);
    };
    fetchTelefones();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/celulares/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setTelefones(telefones.filter(telefone => telefone.id !== id));
    } catch (error) {
      console.error('Error deleting phone', error);
    }
  };

  return (
    <div className="listar-telefones-container">
      <NavBar />
      <div className="listar-telefones-content">
        <h2>Lista de Celular</h2>
        <Link to="/adicionar-telefone" className="add-telefone-button">Adicionar Celular</Link>
        <table className="telefones-table">
          <thead>
            <tr>
              <th>IMEI</th>
              <th>Modelo</th>
              <th>Fabricante</th>
              <th>Número</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {telefones.map(telefone => (
              <tr key={telefone.id}>
                <td>{telefone.imei}</td>
                <td>{telefone.modelo}</td>
                <td>{telefone.fabricante}</td>
                <td>{telefone.numero}</td>
                <td>
                  <Link to={`/alterar-telefone/${telefone.id}`} className="edit-button">Editar</Link>
                  <button onClick={() => handleDelete(telefone.id)} className="delete-button">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarTelefones;
