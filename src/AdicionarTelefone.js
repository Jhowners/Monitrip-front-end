import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdicionarTelefone.css';
import NavBar from './Components/NavBar';

const AdicionarTelefone = () => {
  const [telefone, setTelefone] = useState({
    imei: '',
    modelo: '',
    fabricante: '',
    numero: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTelefone(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    axios.post(process.env.REACT_APP_API_URL + '/celulares', telefone, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(() => {
      navigate('/listar-telefones');
    })
    .catch(error => {
      console.error('Error adding phone', error);
    });
  };

  return (
    <div className="adicionar-telefone-container">
      <NavBar />
      <div className="adicionar-telefone-content">
        <h2>Adicionar Telefone</h2>
        <form onSubmit={handleSubmit} className="adicionar-telefone-form">
          <div className="form-group">
            <label htmlFor="imei">IMEI</label>
            <input type="text" id="imei" name="imei" value={telefone.imei} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="modelo">Modelo</label>
            <input type="text" id="modelo" name="modelo" value={telefone.modelo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fabricante">Fabricante</label>
            <input type="text" id="fabricante" name="fabricante" value={telefone.fabricante} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="numero">Número</label>
            <input type="text" id="numero" name="numero" value={telefone.numero} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Adicionar</button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarTelefone;
