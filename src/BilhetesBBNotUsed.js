// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt,FaPhoneAlt } from 'react-icons/fa';
// import './css/Bilhete.css';
// import NavBar from './Components/NavBar';
// import GlobalUrl from './GlobalUrl';
// import ModalBilhete from './Components/ModalBilhete'
// import FormatarData from './Components/FormatarData';
// import FormatarHora from './Components/FormatarHora';
// import FormatarCpf from './Components/FormatarCpf';
// import FormatarTelefone from './Components/FormatarTelefone';
// import FormatarCnpj from './Components/FormatarCnpj';

// const BilhetesBB = () => {
//   const [bilhetes, setBilhetes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBilhete, setSelectedBilhete] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem('authToken');

//     if (token) {
//       axios.get(GlobalUrl + '/bilhetesBB', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'ngrok-skip-browser-warning': 'true'
//         }
//       })
//       .then(response => {
//         setBilhetes(response.data.bilhetes || response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching tickets', error);
//         setLoading(false);
//       });
//     } else {
//       console.error('Token não encontrado');
//       setLoading(false);
//     }
//   }, []);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + '...';
//     }
//     return text;
//   };
  
//   const handleOpenModal = (bilhete) => {
//     setSelectedBilhete(bilhete);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedBilhete(null);
//   };

//   if (loading) {
//     return <div>Carregando...</div>;
//   }

//   return (
//     <div className="bilhetes-container">
//       <NavBar />
//       <div className="bilhetes-content">
//         <h2>Bilhetes do Brasil Bus</h2>
//         {Array.isArray(bilhetes) && bilhetes.length === 0 ? (
//           <p>Nenhum bilhete encontrado.</p>
//         ) : (
//           <div className="bilhetes-grid">
//             {Array.isArray(bilhetes) && bilhetes.map(bilhete => (
//               <div key={bilhete.id} className="bilhete-card" onClick={() => handleOpenModal(bilhete)}>
//                 <div className="bilhete-header">
//                   <h3>Bilhete {bilhete.numeroBilheteEmbarque}</h3>
//                   <FaTicketAlt />
//                 </div>
//                 <div className="bilhete-body">
//                   <div className="bilhete-info">
//                     <div><strong>CNPJ:</strong> <FormatarCnpj cnpj={bilhete.cnpjEmpresa}/></div>
//                     <div><strong>Data de Emissão:</strong> <FormatarData data={bilhete.dataEmissaoBilhete}/></div>
//                     <div><strong>Hora de Emissão:</strong> <FormatarHora time={bilhete.horaEmissaoBilhete}/></div>
//                     <div><strong>Valor Total:</strong> R$ {bilhete.valorTotal} </div>
//                   </div>
//                   <div className="bilhete-info">
//                     <div><strong>Nome do Passageiro:</strong> {truncateText(bilhete.informacoesPassageiro.nomePassageiro, 30)}</div>
//                     <div><strong>Documento:</strong> {bilhete.informacoesPassageiro.documentoIdentificacaoPassageiro}</div>
//                     <div><strong>CPF:</strong> <FormatarCpf cpf={bilhete.informacoesPassageiro.cpfPassageiro}/></div>
//                     <div><FaPhoneAlt className="icon"/><strong>Celular:</strong> <FormatarTelefone phone={bilhete.informacoesPassageiro.celularPassageiro}/></div>
//                   </div>
//                   <div className="bilhete-info">
//                     <div><FaCalendarAlt /> <strong>Data da Viagem:</strong> <FormatarData data={bilhete.dataViagem}/></div>
//                     <div><FaMapMarkerAlt /> <strong>Origem:</strong> {bilhete.idPontoOrigemViagem}</div>
//                     <div><FaMapMarkerAlt /> <strong>Destino:</strong> {bilhete.idPontoDestinoViagem}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <ModalBilhete isOpen={isModalOpen} onClose={handleCloseModal} bilhete={selectedBilhete} />
//     </div>
//   );
// };

// export default BilhetesBB;
