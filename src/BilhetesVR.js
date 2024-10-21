import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import NavBar from './Components/NavBar';
import ModalBilhete from './Components/ModalBilhete';
import FormataDataBilhetes from './Components/FormataDataBilhetes';
import FormatarHora from './Components/FormatarHora';
import FormatarCpf from './Components/FormatarCpf';
import FormatarTelefone from './Components/FormatarTelefone';
import FormatarCnpj from './Components/FormatarCnpj';
import './css/Bilhete.css';

const BilhetesVR = () => {
  const [bilhetes, setBilhetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBilhete, setSelectedBilhete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // Novo estado para ordenação

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      axios.get(process.env.REACT_APP_API_URL + '/bilhetesVR', {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        params: {
          page: currentPage - 1
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

  // Função para alternar a ordenação
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Função para ordenar bilhetes por data (como string)
  const sortBilhetesByDate = (bilhetes) => {
    return bilhetes.sort((a, b) => {
      const dateA = a.dataViagem;
      const dateB = b.dataViagem;
      return sortOrder === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
    });
  };

  // Ordenar os bilhetes antes de renderizar
  const sortedBilhetes = sortBilhetesByDate(bilhetes);

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
          <h2>Bilhetes da Estrela Rondonia</h2>
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
                  <th onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                    Data da Viagem {sortOrder === 'asc' ? '↑' : '↓'}
                  </th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Transação</th>
                </tr>
              </thead>
              <tbody>
                {sortedBilhetes.map(bilhete => (
                  <tr key={bilhete.id} onClick={() => handleOpenModal(bilhete)}>
                    <td>{bilhete.numeroBilheteEmbarque}</td>
                    <td>
                      <FormatarCnpj
                        cnpj={bilhete.cnpjEmpresa ? bilhete.cnpjEmpresa : 'Não Cadastrado'}
                      />
                    </td>
                    <td>
                      <FaCalendarAlt className="icon" />
                      <FormataDataBilhetes
                        data={bilhete.dataEmissaoBilhete ? bilhete.dataEmissaoBilhete : 'Não Cadastrado'}
                      />
                    </td>
                    <td>
                      <FaCalendarAlt className="icon" />
                      <FormatarHora
                        time={bilhete.horaEmissaoBilhete ? bilhete.horaEmissaoBilhete : 'Não Cadastrado'}
                      />
                    </td>
                    <td>R$ {bilhete.valorTotal ? bilhete.valorTotal : 'Não Cadastrado'}</td>
                    <td>
                      {truncateText(bilhete.informacoesPassageiro.nomePassageiro ? bilhete.informacoesPassageiro.nomePassageiro : 'Não Cadastrado', 30)}
                    </td>
                    <td>
                      <FormatarCpf
                        cpf={bilhete.informacoesPassageiro.cpfPassageiro ? bilhete.informacoesPassageiro.cpfPassageiro : 'Não Cadastrado'}
                      />
                    </td>
                    <td>
                      <FaPhoneAlt className="icon" />
                      <FormatarTelefone
                        phone={bilhete.informacoesPassageiro.celularPassageiro ? bilhete.informacoesPassageiro.celularPassageiro : 'Não Cadastrado'}
                      />
                    </td>
                    <td>
                      <FaCalendarAlt className="icon" />
                      <FormataDataBilhetes
                        data={bilhete.dataViagem ? bilhete.dataViagem : 'Não Cadastrado'}
                      />
                    </td>
                    <td>
                      <FaMapMarkerAlt className="icon" />
                      {bilhete.origem ? bilhete.origem : 'Não Cadastrado'}
                    </td>
                    <td>
                      <FaMapMarkerAlt className="icon" />
                      {bilhete.destino ? bilhete.destino : 'Não Cadastrado'}
                    </td>
                    <td>{bilhete.idTransacao ? bilhete.idTransacao : 'Não Cadastrado'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedBilhete && (
          <ModalBilhete
            bilhete={selectedBilhete}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default BilhetesVR;
