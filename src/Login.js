import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './css/Login.css';
import ModalRegistrar from './Components/ModalRegistrar.js'
import GlobalUrl from './GlobalUrl.js';


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
      
      const response = await axios.post( GlobalUrl+'/auth/login', {
        email: values.email,
        senha: values.senha,
      });
      console.log(response.data);
      
      // Supondo que o token esteja na resposta e você queira armazená-lo
      sessionStorage.setItem('authToken', response.data.token);
      
      // Atualize a mensagem de sucesso
      setSuccessMessage('Seja bem-vindo ao sistema!');

       setTimeout(() => {
        window.location.href = '/empresas';
      }, 2000);
   
    } catch (error) {
      console.error('Erro ao enviar dados', error);

      if(error.response){
        if(error.response.status === 403){
          alert("Falha ao realizar o login. Verifique suas credenciais")
        }
        else{
          alert("Occorreu um erro ao tentar utilizar o login.")
        }
        
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Insira suas credenciais</h2>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required-asterisk"></span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  placeholder="Insira o seu E-mail"
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="senha">
                  Senha <span className="required-asterisk"></span>
                </label>
                <Field
                  type="password"
                  id="senha"
                  name="senha"
                  className={`form-control ${touched.senha && errors.senha ? 'is-invalid' : ''}`}
                  placeholder="Insira a sua senha"
                />
                <ErrorMessage name="senha" component="div" className="invalid-feedback" />
              </div>
              {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <button type="submit" className="submit-button" disabled={isSubmitting}>
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
