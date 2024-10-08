// src/Components/FormatarData.js
import React from 'react';

const FormatarData = ({ data }) => {
  const formatarData = (data) => {
    // Converte a data para o formato Date, se necessário
    const date = new Date(data);

    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  return <span>{formatarData(data)}</span>;
};

export default FormatarData;
