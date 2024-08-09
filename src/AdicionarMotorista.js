import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './css/AdicionarMotorista.css';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import MascaraCPF from './Components/MascaraCPF';
import MascaraData from './Components/MascaraData';

// Função para remover a máscara do CPF
const removerMascaraCPF = (cpf) => {
  return cpf.replace(/[^\d]/g, ''); // Remove tudo que não é dígito
};

const converterDataParaISO = (data) => {
  if (!data) return ''; // Retorna uma string vazia se a data estiver indefinida ou vazia

  // Espera o formato dd/mm/yyyy
  const partes = data.split('/');
  if (partes.length !== 3) return ''; // Retorna uma string vazia se o formato estiver incorreto

  const [dia, mes, ano] = partes.map(Number);
  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return ''; // Retorna uma string vazia se qualquer parte não for um número

  // Ajusta para yyyy-mm-dd
  return `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
};

const AdicionarMotorista = () => {
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
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

    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchMotorista = async () => {
        const token = sessionStorage.getItem('authToken');
        const response = await axios.get(`${GlobalUrl}/motoristas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });

        // Assumindo que a API retorna a data no formato YYYY-MM-DD
        const dataFormatada = response.data.data_nascimento 
          ? new Date(response.data.data_nascimento).toLocaleDateString('pt-BR') 
          : '';
        setMotorista({
          ...response.data,
          data_nascimento: dataFormatada
        });
      };
      fetchMotorista();
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    // Remove a máscara do CPF e converte a data antes de enviar
    const motoristaSemMascara = {
      ...motorista,
      cpf: removerMascaraCPF(motorista.cpf),
      data_nascimento: converterDataParaISO(motorista.data_nascimento)
    };

    if (isEditing) {
      axios.put(`${GlobalUrl}/motoristas/${id}`, motoristaSemMascara, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then(() => {
        navigate('/listar-motoristas');
      })
      .catch(error => {
        console.error('Error updating driver', error);
      });
    } else {
      axios.post(GlobalUrl + '/motoristas', motoristaSemMascara, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then(() => {
        navigate('/listar-motoristas');
      })
      .catch(error => {
        console.error('Error adding driver', error);
      });
    }
  };

  return (
    <div className="adicionar-motorista-container">
      <NavBar />
      <div className="adicionar-motorista-content">
        <h2>{isEditing ? 'Editar Motorista' : 'Adicionar Motorista'}</h2>
        <form onSubmit={handleSubmit} className="adicionar-motorista-form">
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
              <option value="ativo" defaultValue={"ativo"}>Ativo</option>
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
          <button type="submit" className="submit-button">{isEditing ? 'Salvar Alterações' : 'Adicionar'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarMotorista;
