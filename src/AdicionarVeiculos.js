import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdicionarVeiculos.css';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';

const AdicionarVeiculo = () => {
  const [veiculo, setVeiculo] = useState({
    placa: '',
    modelo: '',
    capacidade: '',
    ano_fabricacao: '',
    status: '',
    marca: '',
    celular: {
      id: '' // Alterado para id do celular
    }
  });
  const [celulares, setCelulares] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelulares = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(GlobalUrl + '/celulares', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setCelulares(response.data);
      } catch (error) {
        console.error('Error fetching celulares', error);
      }
    };

    fetchCelulares();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('celular.')) {
      const celularKey = name.split('.')[1];
      setVeiculo(prevState => ({
        ...prevState,
        celular: {
          ...prevState.celular,
          [celularKey]: value
        }
      }));
    } else {
      setVeiculo(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    axios.post(GlobalUrl + '/veiculos', veiculo, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(() => {
      navigate('/listar-veiculos');
    })
    .catch(error => {
      console.error('Error adding vehicle', error);
    });
  };

  return (
    <div className="adicionar-veiculo-container">
      <NavBar />
      <div className="adicionar-veiculo-content">
        <h2>Adicionar Veículo</h2>
        <form onSubmit={handleSubmit} className="adicionar-veiculo-form">
          <div className="form-group">
            <label htmlFor="placa">Placa</label>
            <input type="text" id="placa" name="placa" value={veiculo.placa} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modelo">Modelo</label>
            <input type="text" id="modelo" name="modelo" value={veiculo.modelo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="capacidade">Capacidade</label>
            <input type="number" id="capacidade" name="capacidade" value={veiculo.capacidade} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="ano_fabricacao">Ano de Fabricação</label>
            <input type="number" id="ano_fabricacao" name="ano_fabricacao" value={veiculo.ano_fabricacao} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={veiculo.status} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="marca">Marca</label>
            <input type="text" id="marca" name="marca" value={veiculo.marca} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="celular.id">Celular</label>
            <select
              id="celular.id"
              name="celular.id"
              value={veiculo.celular.id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {celulares.map(celular => (
                <option key={celular.id} value={celular.id}>
                  {celular.numero}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Adicionar</button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarVeiculo;
