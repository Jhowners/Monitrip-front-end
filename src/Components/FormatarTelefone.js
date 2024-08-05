import React from 'react';

const formatPhone = (phone) => {
  return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
};

const FormatarTelefone = ({ phone }) => (
  <span>{formatPhone(phone)}</span>
);

export default FormatarTelefone;
