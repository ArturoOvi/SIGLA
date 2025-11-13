import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export const SelectDepartamento = ({ field, data }) => {
  return (
    <>
      <InputLabel id="departamento-label">Departamento</InputLabel>
      <Select
        {...field}
        labelId="departamento-label"
        id="idDepartamento"
        label="Departamento"
      >
        <MenuItem value="">
          <em>Seleccione un departamento</em>
        </MenuItem>
        {data.map((departamento) => (
          <MenuItem key={departamento.idDepartamento} value={departamento.idDepartamento}>
            {departamento.nombreDepartamento}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};