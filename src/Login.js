import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './css/Login.css';
import ModalRegistrar from './Components/ModalRegistrar.js'

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: Yup.string().min(5, 'Senha deve ter pelo menos 5 caracteres').required('Campo obrigatório'),
});

const Login = () => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setSuccessMessage(''); // Limpar mensagens anteriores
    setErrorMessage(''); // Limpar mensagens de erro
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', {
        email: values.email,
        senha: values.senha,
      });
      
      // Supondo que o token esteja na resposta e você queira armazená-lo
      sessionStorage.setItem('authToken', response.data.token);
      
      // Atualize a mensagem de sucesso
      setSuccessMessage('Seja bem-vindo ao sistema!');

      setTimeout(() => {
        window.location.href = '/empresas';
      }, 2000);
   
    } catch (error) {
      console.error('Erro ao enviar dados', error);

      if (error.response) {
        if (error.response.status === 403) {
          alert("Falha ao realizar o login. Verifique suas credenciais");
        } else {
          alert("Occorreu um erro ao tentar utilizar o login.");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        background: '#1a1a1a',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: '#2a2a2a',
          padding: '2rem',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: '#e0e0e0' }}>
          Insira suas credenciais
        </h2>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#e0e0e0' }}>
                  Email <span className="required-asterisk"></span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    backgroundColor: '#333',
                    color: '#ddd',
                    fontSize: '1rem'
                  }}
                  placeholder="Insira o seu E-mail"
                />
                <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="senha" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#e0e0e0' }}>
                  Senha <span className="required-asterisk"></span>
                </label>
                <Field
                  type="password"
                  id="senha"
                  name="senha"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    backgroundColor: '#333',
                    color: '#ddd',
                    fontSize: '1rem'
                  }}
                  placeholder="Insira a sua senha"
                />
                <ErrorMessage name="senha" component="div" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }} />
              </div>
              {errorMessage && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errorMessage}</div>}
              {successMessage && <div style={{ color: 'green', fontSize: '1rem' }}>{successMessage}</div>}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Entrar'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
