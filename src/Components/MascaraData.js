// src/Components/MascaraDataNascimento.js
import React from 'react';
import InputMask from 'react-input-mask';

const MascaraData = ({ value, onChange, name }) => {
  return (
    <InputMask
      mask="99/99/9999" // Ajustado para o formato correto
      value={value}
      onChange={(e) => onChange({ target: { name, value: e.target.value } })}
      placeholder="DD/MM/YYYY"
      maskChar={null}
    >
      {(inputProps) => <input {...inputProps} type="text" />}
    </InputMask>
  );
};

export default MascaraData;
