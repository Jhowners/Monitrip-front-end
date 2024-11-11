import React from 'react';

const FormatarDataHoraListar = ({ dataHora }) => {
  if (!dataHora) return null;

  // Transformar a string de data/hora em um objeto de data
  const data = new Date(dataHora);

  // Formatar a data e hora
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses começam em 0
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');

  const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

  return <span>{dataFormatada}</span>;
};

export default FormatarDataHoraListar;
