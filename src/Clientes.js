import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Clientes.css';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o token está presente
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login'; // Redireciona para login se o token não estiver presente
      return;
    }

    // Fazer requisição para buscar os dados dos clientes
    axios.get(GlobalUrl + '/empresas', {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => {
      setClientes(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching clients', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="clientes-container">
      <NavBar />
      <div className="clientes-content">
        <h2>Clientes</h2>
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CNPJ</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.cnpj}</td>
                <td>{cliente.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
