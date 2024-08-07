import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdicionarMotorista.css';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';

const AdicionarMotorista = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('empresa.')) {
      const empresaKey = name.split('.')[1];
      setMotorista(prevState => ({
        ...prevState,
        empresa: {
          ...prevState.empresa,
          [empresaKey]: value
        }
      }));
    } else {
      setMotorista(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    axios.post(GlobalUrl + '/motoristas', motorista, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(() => {
      navigate('/motoristas');
    })
    .catch(error => {
      console.error('Error adding driver', error);
    });
  };

  return (
    <div className="adicionar-motorista-container">
      <NavBar />
      <div className="adicionar-motorista-content">
        <h2>Adicionar Motorista</h2>
        <form onSubmit={handleSubmit} className="adicionar-motorista-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" value={motorista.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" value={motorista.cpf} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento</label>
            <input type="date" id="data_nascimento" name="data_nascimento" value={motorista.data_nascimento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="numero_cnh">Número CNH</label>
            <input type="text" id="numero_cnh" name="numero_cnh" value={motorista.numero_cnh} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="categoria_cnh">Categoria CNH</label>
            <select id="categoria_cnh" name="categoria_cnh" value={motorista.categoria_cnh} onChange={handleChange} required>
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
            <select id="status" name="status" value={motorista.status} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="empresa.id">Empresa ID</label>
            <input type="text" id="empresa.id" name="empresa.id" value={motorista.empresa.id} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Adicionar</button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarMotorista;
