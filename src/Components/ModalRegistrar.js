import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ModalRegistrar.css'; 
import GlobalUrl from '../GlobalUrl';

Modal.setAppElement('#root'); // Para acessibilidade

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: Yup.string().min(5, 'Senha deve ter pelo menos 5 caracteres').required('Campo obrigatório'),
  role: Yup.string().required('Campo obrigatório'),
});

const RegisterModal = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      role: 'USER',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setSuccessMessage('');
      try {
        const response = await axios.post(GlobalUrl+'/auth/registrar', values, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // Verificar a estrutura da resposta
        console.log('Resposta da API:', response.data);

        if (response.status === 200) {
          // Armazenar o token no localStorage
          sessionStorage.setItem('authToken', response.data.token);

          // Exibir mensagem de sucesso
          setSuccessMessage('Registro realizado com sucesso!');
          
          // Opcional: Fechar o modal após sucesso
          setTimeout(() => {
            closeModal();
          }, 2000); // Fecha o modal após 2 segundos
        }

      } catch (err) {
        setError('Falha no registro. Verifique suas informações.');
      } finally {
        setLoading(false);
      }
    },
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>Registrar</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Registrar</h2>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <form onSubmit={formik.handleSubmit} className="modal-body">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('email')}
            />
            <div className="invalid-feedback">
              {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className={`form-control ${formik.touched.senha && formik.errors.senha ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('senha')}
            />
            <div className="invalid-feedback">
              {formik.touched.senha && formik.errors.senha ? formik.errors.senha : ''}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Função</label>
            <select
              id="role"
              name="role"
              className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
              {...formik.getFieldProps('role')}
            >
              <option value="USER">USER</option>
            </select>
            <div className="invalid-feedback">
              {formik.touched.role && formik.errors.role ? formik.errors.role : ''}
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Enviando...' : 'Registrar'}
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </form>
      </Modal>
    </div>
  );
};

export default RegisterModal;
