import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import './css/EditarVeiculo.css';

const EditarVeiculos = () => {
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVeiculo = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(`${GlobalUrl}/veiculos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setVeiculo(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículo', error);
      }
    };
    fetchVeiculo();
  }, [id]);

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

    axios.put(`${GlobalUrl}/veiculos/${id}`, veiculo, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(() => {
      navigate('/listar-veiculos');
    })
    .catch(error => {
      console.error('Erro ao atualizar veículo', error);
    });
  };

  if (!veiculo) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="editar-veiculo-container">
      <NavBar />
      <div className="editar-veiculo-content">
        <h2>Editar Veículo</h2>
        <form onSubmit={handleSubmit} className="editar-veiculo-form">
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
            <label htmlFor="categoria_cnh">Categoria CNH</label>
            <input type="text" id="categoria_cnh" name="categoria_cnh" value={veiculo.categoria_cnh} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="celular.id">ID do Celular</label>
            <input type="number" id="celular.id" name="celular.id" value={veiculo.celular.id} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarVeiculos;