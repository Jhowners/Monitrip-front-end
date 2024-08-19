import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './css/AdicionarTelefone.css';
import NavBar from './Components/NavBar';

const AlterarTelefone = () => {
  const { id } = useParams();
  const [telefone, setTelefone] = useState({
    imei: '',
    modelo: '',
    fabricante: '',
    numero: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTelefone = async () => {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/celulares/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setTelefone(response.data);
    };
    fetchTelefone();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTelefone(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    axios.put(`${process.env.REACT_APP_API_URL}/celulares/${id}`, telefone, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(() => {
      navigate('/listar-telefones');
    })
    .catch(error => {
      console.error('Error updating phone', error);
    });
  };

  return (
    <div className="adicionar-telefone-container">
      <NavBar />
      <div className="adicionar-telefone-content">
        <h2>Editar Telefone</h2>
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
          <button type="submit" className="submit-button">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
};

export default AlterarTelefone;
