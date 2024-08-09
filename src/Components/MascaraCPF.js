// src/Components/MascaraCPF.js
import React from 'react';
import InputMask from 'react-input-mask';

const MascaraCPF = ({ value, onChange, name }) => {
  return (
    <InputMask
      mask="999.999.999-99"
      value={value}
      onChange={onChange}
      placeholder="Digite o CPF"
    >
      {(inputProps) => <input {...inputProps} type="text" name={name} />}
    </InputMask>
  );
};

export default MascaraCPF;
