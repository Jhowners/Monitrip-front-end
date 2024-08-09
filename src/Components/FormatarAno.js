// src/Components/FormatarData.js
import React from 'react';

const FormatarData = ({ data }) => {
  // Formata a data no formato desejado, por exemplo: DD/MM/YYYY
  const formatarData = (data) => {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return <span>{formatarData(data)}</span>;
};

export default FormatarData;
