import React from 'react';

const formatDate = (dateStr) => {
  if (!dateStr) return '';

  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString('pt-BR');
};

const FormatarData = ({ data }) => (
  <span>{formatDate(data)}</span>
);

export default FormatarData;
