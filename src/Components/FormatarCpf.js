import React from 'react';

const formatCpf = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const FormatarCpf = ({ cpf }) => (
  <span>{formatCpf(cpf)}</span>
);

export default FormatarCpf;
