import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import NavBar from './Components/NavBar';
import GlobalUrl from './GlobalUrl';
import ModalBilhete from './Components/ModalBilhete';
import FormatarData from './Components/FormatarData';
import FormatarHora from './Components/FormatarHora';
import FormatarCpf from './Components/FormatarCpf';
import FormatarTelefone from './Components/FormatarTelefone';
import FormatarCnpj from './Components/FormatarCnpj';
import './css/Bilhete.css';

const ITEMS_PER_PAGE = 10;

const BilhetesVR = () => {
  const [bilhetes, setBilhetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBilhete, setSelectedBilhete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    
    if (token) {
      axios.get(GlobalUrl + '/bilhetesVR', {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        params: {
          page: currentPage,
          size: ITEMS_PER_PAGE
        }
      })
      .then(response => {
        setBilhetes(response.data.content || response.data.bilhetes || []);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tickets', error);
        setLoading(false);
      });
    } else {
      console.error('Token não encontrado');
      setLoading(false);
    }
  }, [currentPage]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleOpenModal = (bilhete) => {
    setSelectedBilhete(bilhete);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBilhete(null);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="bilhetes-container">
      <NavBar />
      <div className="bilhetes-content">
        <div className="bilhetes-header">
          <h2>Bilhetes do Brasil Bus</h2>
        </div>
        {Array.isArray(bilhetes) && bilhetes.length === 0 ? (
          <p>Nenhum bilhete encontrado.</p>
        ) : (
          <>
            <table className="bilhetes-table">
              <thead>
                <tr>
                  <th>Bilhete</th>
                  <th>CNPJ</th>
                  <th>Data de Emissão</th>
                  <th>Hora de Emissão</th>
                  <th>Valor Total</th>
                  <th>Nome Passageiro</th>
                  <th>CPF</th>
                  <th>Celular</th>
                  <th>Data da Viagem</th>
                  <th>Origem</th>
                  <th>Destino</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bilhetes) && bilhetes.map(bilhete => (
                  <tr key={bilhete.id} onClick={() => handleOpenModal(bilhete)}>
                    <td>{bilhete.numeroBilheteEmbarque}</td>
                    <td><FormatarCnpj cnpj={bilhete.cnpjEmpresa} /></td>
                    <td><FaCalendarAlt className="icon" /> <FormatarData data={bilhete.dataEmissaoBilhete} /></td>
                    <td><FaCalendarAlt className="icon" /> <FormatarHora time={bilhete.horaEmissaoBilhete} /></td>
                    <td>R$ {bilhete.valorTotal}</td>
                    <td>{truncateText(bilhete.informacoesPassageiro.nomePassageiro, 30)}</td>
                    <td><FormatarCpf cpf={bilhete.informacoesPassageiro.cpfPassageiro} /></td>
                    <td><FaPhoneAlt className="icon" /><FormatarTelefone phone={bilhete.informacoesPassageiro.celularPassageiro} /></td>
                    <td><FaCalendarAlt className="icon" /> <FormatarData data={bilhete.dataViagem} /></td>
                    <td><FaMapMarkerAlt className="icon" /> {bilhete.idPontoOrigemViagem}</td>
                    <td><FaMapMarkerAlt className="icon" /> {bilhete.idPontoDestinoViagem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-controls">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
      <ModalBilhete isOpen={isModalOpen} onClose={handleCloseModal} bilhete={selectedBilhete} />
    </div>
  );
};

export default BilhetesVR;
