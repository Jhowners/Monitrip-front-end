import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './css/Login.css';

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
      debugger
      const response = await axios.post('https://7999-2804-1b3-a180-2169-6c61-dfac-ab67-2920.ngrok-free.app/auth/login', {
        email: values.email,
        senha: values.senha,
      });
      console.log(response.data);
      
      // Supondo que o token esteja na resposta e você queira armazená-lo
      localStorage.setItem('authToken', response.data.token);
      
      // Atualize a mensagem de sucesso
      setSuccessMessage('Seja bem-vindo ao sistema!');
    } catch (error) {
      console.error('Erro ao enviar dados', error);
      setErrorMessage('Falha ao realizar login. Verifique suas credenciais.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Entrar</h2>
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
