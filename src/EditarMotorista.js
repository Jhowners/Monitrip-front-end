import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import './css/EditarMotorista.css';

const EditarMotorista = () => {
  const { id } = useParams(); // Obter o ID da URL
  const [motorista, setMotorista] = useState({
    name: '',
    cpf: '',
    data_nascimento: '',
    numero_cnh: '',
    categoria_cnh: '',
    status: '',
    empresa: { id: '' }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotorista = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(`${GlobalUrl}/motoristas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setMotorista(response.data);
      } catch (error) {
        console.error('Erro ao buscar motorista', error);
      }
    };
    fetchMotorista();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMotorista(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');
    try {
      await axios.put(`${GlobalUrl}/motoristas/${id}`, motorista, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      navigate('/listar-motoristas');
    } catch (error) {
      console.error('Erro ao atualizar motorista', error);
    }
  };

  return (
    <div className="editar-motorista-container">
      <NavBar />
      <div className="editar-motorista-content">
        <h2>Editar Motorista</h2>
        <form onSubmit={handleSubmit} className="editar-motorista-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={motorista.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={motorista.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento</label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={motorista.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numero_cnh">Número CNH</label>
            <input
              type="text"
              id="numero_cnh"
              name="numero_cnh"
              value={motorista.numero_cnh}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria_cnh">Categoria CNH</label>
            <select
              id="categoria_cnh"
              name="categoria_cnh"
              value={motorista.categoria_cnh}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={motorista.status}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="empresa.id">Empresa ID</label>
            <input
              type="text"
              id="empresa.id"
              name="empresa.id"
              value={motorista.empresa.id}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarMotorista;
