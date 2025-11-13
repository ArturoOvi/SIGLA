import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export const SelectPuesto = ({ field, data }) => {
  return (
    <>
      <InputLabel id="puesto-label">Puesto</InputLabel>
      <Select
        {...field}
        labelId="puesto-label"
        id="idPuesto"
        label="Puesto"
      >
        <MenuItem value="">
          <em>Seleccione un puesto</em>
        </MenuItem>
        {data.map((puesto) => (
          <MenuItem key={puesto.idPuesto} value={puesto.idPuesto}>
            {puesto.nombrePuesto}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};