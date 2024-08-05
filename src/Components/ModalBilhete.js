import React from 'react';
import '../css/BilheteModal.css';
import FormatarData from './FormatarData';
import FormatarHora from './FormatarHora';
import FormatarCpf from './FormatarCpf';
import FormatarTelefone from './FormatarTelefone';
import FormatarCnpj from './FormatarCnpj';

const BilheteModal = ({ isOpen, onClose, bilhete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        <h2>Detalhes do Bilhete</h2>
        <div className="modal-body">
          <div className="modal-section">
            <h3>Informações Básicas</h3>
            <p><strong>Código Bilhete:</strong> {bilhete.codigoBilheteEmbarque}</p>
            <p><strong>CNPJ da Empresa:</strong> <FormatarCnpj cnpj={bilhete.cnpjEmpresa}/></p>
            <p><strong>Número Série Equipamento Fiscal:</strong> {bilhete.numeroSerieEquipamentoFiscal}</p>
            <p><strong>Data de Emissão:</strong> <FormatarData data={bilhete.dataEmissaoBilhete}/></p>
            <p><strong>Hora de Emissão:</strong> <FormatarHora time={bilhete.horaEmissaoBilhete}/></p>
            <p><strong>Data da Viagem:</strong> <FormatarData data={bilhete.dataViagem}/></p>
            <p><strong>Hora da Viagem:</strong> <FormatarHora time={bilhete.horaViagem}/></p>
            <p><strong>Valor Total:</strong> R$ {bilhete.valorTotal}</p>
          </div>
          <div className="modal-section">
            <h3>Informações do Passageiro</h3>
            <p><strong>Nome:</strong> {bilhete.informacoesPassageiro.nomePassageiro}</p>
            <p><strong>Documento:</strong> {bilhete.informacoesPassageiro.documentoIdentificacaoPassageiro}</p>
            <p><strong>CPF:</strong> <FormatarCpf cpf={bilhete.informacoesPassageiro.cpfPassageiro}/></p>
            <p><strong>Celular:</strong>  <FormatarTelefone phone={bilhete.informacoesPassageiro.celularPassageiro}/></p>
          </div>
          <div className="modal-section">
            <h3>Detalhes da Viagem</h3>
            <p><strong>Ponto Origem:</strong> {bilhete.idPontoOrigemViagem}</p>
            <p><strong>Ponto Destino:</strong> {bilhete.idPontoDestinoViagem}</p>
          </div>
        </div>
        <button className="close-button-bottom" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default BilheteModal;
