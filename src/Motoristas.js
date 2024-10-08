import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento
import './css/Motoristas.css';
import NavBar from './Components/NavBar';

const Motoristas = () => {
  const [motoristas, setMotoristas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Usar useNavigate para redirecionamento

  useEffect(() => {
    // Verificar se o token está presente
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login'; // Redireciona para login se o token não estiver presente
      return;
    }

    // Fazer requisição para buscar os dados dos motoristas
    axios.get(process.env.REACT_APP_API_URL + '/motoristas', {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => {
      setMotoristas(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching drivers', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="motoristas-container">
      <NavBar />
      <div className="motoristas-content">
        <h2>Motoristas</h2>
        <button onClick={() => navigate('/adicionar-motorista')} className="add-motorista-button">Adicionar Motorista</button>
        <table className="motoristas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Número CNH</th>
              <th>Categoria CNH</th>
              <th>Status</th>
              <th>Empresa</th>
              <th>CNPJ Empresa</th>
            </tr>
          </thead>
          <tbody>
            {motoristas.map(motorista => (
              <tr key={motorista.id}>
                <td>{motorista.id}</td>
                <td>{motorista.name}</td>
                <td>{motorista.cpf}</td>
                <td>{new Date(motorista.data_nascimento).toLocaleDateString()}</td>
                <td>{motorista.numero_cnh}</td>
                <td>{motorista.categoria_cnh}</td>
                <td>{motorista.status}</td>
                <td>{motorista.empresa.name}</td>
                <td>{motorista.empresa.cnpj}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Motoristas;
