// src/Components/FormatarData.js
import React from 'react';

// Função para formatar a data no formato yyyy/mm/dd
const formatarData = (data) => {
  if (!data || typeof data !== 'string') {
    return 'Data inválida';
  }

  // Verifica se a data tem o formato yyyyMMdd
  const formato = /^\d{8}$/;
  if (data.match(formato)) {
    const ano = data.slice(0, 4);
    const mes = data.slice(4, 6);
    const dia = data.slice(6, 8);

    // Verifica se o mês e o dia são válidos
    if (ano.length === 4 && mes.length === 2 && dia.length === 2) {
      return `${ano}/${mes}/${dia}`;
    }
  }

  return 'Data inválida';
};

const FormataDataBilhetes = ({ data }) => {
  const dataFormatada = formatarData(data);

  return <span>{dataFormatada}</span>;
};

export default FormataDataBilhetes;
