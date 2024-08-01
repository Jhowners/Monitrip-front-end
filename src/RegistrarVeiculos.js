import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './css/RegistrarVeiculos.css';

const categorias = ['A', 'B', 'C', 'D', 'E'];

const RegistrarVeiculo = () => {
  const [companies, setCompanies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = sessionStorage.getItem('authToken'); // Recupera o token da session storage

    if (token) {
      axios.get('https://7999-2804-1b3-a180-2169-6c61-dfac-ab67-2920.ngrok-free.app/empresas', {
        headers: {
          Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho da requisição
        }
      })
      .then(response => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching companies', error);
        setLoading(false);
      });
    } else {
      console.error('Token não encontrado');
      setLoading(false);
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    cpf: Yup.string().required('Campo obrigatório'),
    data_nascimento: Yup.date().required('Campo obrigatório'),
    numero_cnh: Yup.string().required('Campo obrigatório'),
    categoria_cnh: Yup.string().required('Campo obrigatório'),
    status: Yup.string().oneOf(['ativo', 'inativo'], 'Selecione um status').required('Campo obrigatório'),
    empresa: Yup.string().required('Campo obrigatório')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const token = sessionStorage.getItem('authToken'); // Recupera o token da session storage

    axios.post('https://7999-2804-1b3-a180-2169-6c61-dfac-ab67-2920.ngrok-free.app/veiculos', values, {
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho da requisição
      }
    })
    .then(response => {
      alert('Veículo registrado com sucesso!');
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Erro ao registrar veículo', error);
      alert('Erro ao registrar veículo. Tente novamente.');
      setSubmitting(false);
    });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="register-vehicle-container">
      <div className="register-vehicle-card">
        <h2>Registrar Veículo</h2>
        <Formik
          initialValues={{
            name: '',
            cpf: '',
            data_nascimento: '',
            numero_cnh: '',
            categoria_cnh: '',
            status: 'ativo',
            empresa: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <Field type="text" id="name" name="name" className="form-control" placeholder="Nome do motorista" />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <Field type="text" id="cpf" name="cpf" className="form-control" placeholder="CPF" />
                <ErrorMessage name="cpf" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <Field type="date" id="data_nascimento" name="data_nascimento" className="form-control" />
                <ErrorMessage name="data_nascimento" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="numero_cnh">Número da CNH</label>
                <Field type="text" id="numero_cnh" name="numero_cnh" className="form-control" placeholder="Número da CNH" />
                <ErrorMessage name="numero_cnh" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="categoria_cnh">Categoria da CNH</label>
                <Field as="select" id="categoria_cnh" name="categoria_cnh" className="form-control">
                  <option value="">Selecione a categoria</option>
                  {categorias.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Field>
                <ErrorMessage name="categoria_cnh" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <Field as="select" id="status" name="status" className="form-control">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </Field>
                <ErrorMessage name="status" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="empresa">Empresa</label>
                <Field as="select" id="empresa" name="empresa" className="form-control">
                  <option value="">Selecione a empresa</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="empresa" component="div" className="invalid-feedback" />
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Registrar Veículo'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrarVeiculo;
