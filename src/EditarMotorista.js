import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import MascaraCPF from './Components/MascaraCPF';
import MascaraData from './Components/MascaraData';
import './css/EditarMotorista.css';

// Função para remover a máscara do CPF
const removerMascaraCPF = (cpf) => {
  return cpf.replace(/[^\d]/g, ''); // Remove tudo que não é dígito
};

// Função para converter data no formato dd/mm/yyyy para yyyy-mm-dd
const converterDataParaISO = (data) => {
  const [dia, mes, ano] = data.split('/').map(Number);
  return `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
};

// Função para adicionar um dia à data
const adicionarUmDia = (data) => {
  const date = new Date(data);
  // Verifica se a data é inválida
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }
  // Adiciona um dia à data
  date.setDate(date.getDate() + 1);
  return date;
};

const EditarMotorista = () => {
  const { id } = useParams();
  const [motorista, setMotorista] = useState({
    name: '',
    cpf: '',
    data_nascimento: '',
    numero_cnh: '',
    categoria_cnh: '',
    status: '',
    empresa: { id: '', nome: '' } // Adicionado campo para nome da empresa
  });
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar as empresas
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

        // Adiciona um dia à data e a formata para dd/mm/yyyy
        const dataComUmDia = adicionarUmDia(response.data.data_nascimento);
        const dataFormatada = new Date(dataComUmDia).toLocaleDateString('pt-BR');

        setMotorista({
          ...response.data,
          data_nascimento: dataFormatada
        });
      } catch (error) {
        console.error('Erro ao buscar motorista', error);
      }
    };

    const fetchEmpresas = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(`${GlobalUrl}/empresas`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setEmpresas(response.data);
      } catch (error) {
        console.error('Erro ao buscar empresas', error);
      }
    };

    fetchMotorista();
    fetchEmpresas();
  }, [id]);

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

  const handleEmpresaChange = (e) => {
    const selectedEmpresaId = e.target.value;
    const selectedEmpresa = empresas.find(empresa => empresa.id === selectedEmpresaId);

    setMotorista(prevState => ({
      ...prevState,
      empresa: {
        id: selectedEmpresaId,
        nome: selectedEmpresa ? selectedEmpresa.nome : ''
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');
    
    // Remove a máscara do CPF e converte a data antes de enviar
    const motoristaSemMascara = {
      ...motorista,
      cpf: removerMascaraCPF(motorista.cpf),
      data_nascimento: converterDataParaISO(motorista.data_nascimento)
    };

    try {
      await axios.put(`${GlobalUrl}/motoristas/${id}`, motoristaSemMascara, {
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
            <MascaraCPF
              value={motorista.cpf}
              onChange={handleChange}
              name="cpf"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento</label>
            <MascaraData
              value={motorista.data_nascimento}
              onChange={handleChange}
              name="data_nascimento"
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
            <label htmlFor="empresa">Empresa</label>
            <select
              id="empresa"
              name="empresa.id"
              value={motorista.empresa.id}
              onChange={handleEmpresaChange}
              required
            >
              <option value="">Selecione</option>
              {empresas.map(empresa => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarMotorista;
