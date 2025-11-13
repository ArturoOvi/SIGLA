import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export const SelectEstado = ({ field, error }) => {
  return (
    <>
      <InputLabel id="estado-label">Estado</InputLabel>
      <Select
        {...field}
        labelId="estado-label"
        id="estado"
        label="Estado"
        error={error}
      >
        <MenuItem value={1}>Activo</MenuItem>
        <MenuItem value={0}>Inactivo</MenuItem>
      </Select>
    </>
  );
};
