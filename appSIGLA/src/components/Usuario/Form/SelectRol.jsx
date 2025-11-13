import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export const SelectRol = ({ field, data }) => {
  return (
    <>
      <InputLabel id="rol-label">Rol</InputLabel>
      <Select
        {...field}
        labelId="rol-label"
        id="idRol"
        label="Rol"
      >
        <MenuItem value="">
          <em>Seleccione un rol</em>
        </MenuItem>
        {data.map((rol) => (
          <MenuItem key={rol.idRol} value={rol.idRol}>
            {rol.descripcionRol}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};