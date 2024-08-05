import React from 'react';

const formatTime = (timeStr) => {
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(2, 4);
  const seconds = timeStr.slice(4, 6);
  return `${hours}:${minutes}:${seconds}`;
};

const FormatarHora = ({ time }) => (
  <span>{formatTime(time)}</span>
);

export default FormatarHora;
