// src/Components/FormattedCnpj.js
import React from 'react';

const formatCnpj = (cnpj) => {
  if (!cnpj) return '';

  return cnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
};

const FormatarCnpj = ({ cnpj }) => (
  <span>{formatCnpj(cnpj)}</span>
);

export default FormatarCnpj;
