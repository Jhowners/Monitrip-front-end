import React from 'react';

const FormatarDataListar = ({ data }) => {
  // Função para adicionar um dia à data
  const adicionarUmDia = (data) => {
    const date = new Date(data);
    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    // Adiciona um dia à data
    date.setDate(date.getDate() + 1);
    return date;
  };

  // Função para formatar a data no formato DD/MM/YYYY
  const formatarData = (data) => {
    const date = adicionarUmDia(data);

    // Converte a data para o formato DD/MM/YYYY
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  return <span>{formatarData(data)}</span>;
};

export default FormatarDataListar;
