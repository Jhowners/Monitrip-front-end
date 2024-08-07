import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/RegistrarVeiculos.css'
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';

const Veiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o token está presente
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login'; // Redireciona para login se o token não estiver presente
      return;
    }

    // Fazer requisição para buscar os dados dos veículos
    axios.get(GlobalUrl + '/veiculos', {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => {
      setVeiculos(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching vehicles', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="veiculos-container">
      <NavBar />
      <div className="veiculos-content">
        <h2>Veículos</h2>
        <table className="veiculos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Capacidade</th>
              <th>Ano de Fabricação</th>
              <th>Status</th>
              <th>Marca</th>
              <th>IMEI</th>
              <th>Modelo do Celular</th>
              <th>Fabricante do Celular</th>
              <th>Número do Celular</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map(veiculo => (
              <tr key={veiculo.id}>
                <td>{veiculo.id}</td>
                <td>{veiculo.placa}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.capacidade}</td>
                <td>{veiculo.ano_fabricacao}</td>
                <td>{veiculo.status}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.celular.imei}</td>
                <td>{veiculo.celular.modelo}</td>
                <td>{veiculo.celular.fabricante}</td>
                <td>{veiculo.celular.numero}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Veiculos;
