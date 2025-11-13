import React from 'react';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import DepartamentoService from '../../services/DepartamentoService';
import PuestoService from '../../services/PuestoService';
import RolService from '../../services/RolService';
import { SelectDepartamento } from './Form/SelectDepartamento';
import { SelectPuesto } from './Form/SelectPuesto';
import { SelectRol } from './Form/SelectRol';
import { SelectEstado } from './Form/SelectEstado';
import { FormHelperText } from '@mui/material';
import toast from 'react-hot-toast';

export function CreateUsuario() {
  const navigate = useNavigate();

  // Esquema de validación
  const usuarioSchema = yup.object({
    nombre: yup
      .string()
      .required('El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    apellido1: yup
      .string()
      .required('El primer apellido es requerido')
      .min(2, 'El primer apellido debe tener al menos 2 caracteres'),
    apellido2: yup
      .string()
      .nullable(),
    telefono: yup
      .string()
      .required('El teléfono es requerido')
      .matches(/^[0-9]{8}$/, 'El teléfono debe tener 8 dígitos'),
    direccion: yup
      .string()
      .required('La dirección es requerida')
      .min(5, 'La dirección debe tener al menos 5 caracteres'),
    correo: yup
      .string()
      .required('El correo es requerido')
      .email('Debe ser un correo válido'),
    numerodeCuenta: yup
      .string()
      .required('El número de cuenta es requerido')
      .matches(/^CR[0-9]{20}$/, 'Formato de cuenta inválido (CR + 20 dígitos)'),
    fechaIngreso: yup
      .date()
      .typeError('Fecha inválida')
      .required('La fecha de ingreso es requerida'),
    salario: yup
      .number()
      .typeError('Solo acepta números')
      .required('El salario es requerido')
      .positive('El salario debe ser positivo')
      .min(1000, 'El salario mínimo es 1000'),
    saldoVacaciones: yup
      .number()
      .typeError('Solo acepta números')
      .required('El saldo de vacaciones es requerido')
      .min(0, 'No puede ser negativo'),
    estado: yup
      .number()
      .required('El estado es requerido'),
    idDepartamento: yup
      .number()
      .typeError('Seleccione un departamento')
      .required('El departamento es requerido'),
    idPuesto: yup
      .number()
      .typeError('Seleccione un puesto')
      .required('El puesto es requerido'),
    idRol: yup
      .number()
      .typeError('Seleccione un rol')
      .required('El rol es requerido'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '',
      direccion: '',
      correo: '',
      numerodeCuenta: '',
      fechaIngreso: '',
      salario: '',
      saldoVacaciones: '0',
      estado: 1,
      idDepartamento: '',
      idPuesto: '',
      idRol: '',
    },
    resolver: yupResolver(usuarioSchema),
  });

  // Gestión de errores
  const [error, setError] = useState('');

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  // Acción submit
  const onSubmit = (DataForm) => {
    console.log('Formulario:', DataForm);
    
    try {
      if (usuarioSchema.isValid()) {
        UsuarioService.createUsuario(DataForm)
          .then((response) => {
            setError(response.error);
            
            if (response.data != null) {
              toast.success(
                `Usuario creado #${response.data.idUsuario} - ${response.data.nombre} ${response.data.apellido1}`,
                {
                  duration: 4000,
                  position: 'top-center',
                }
              );
              // Redirección a la tabla de usuarios
              return navigate('/usuarios');
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error('Respuesta no válida del servidor');
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Lista de Departamentos
  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [loadedDepartamento, setLoadedDepartamento] = useState(false);
  useEffect(() => {
    DepartamentoService.getDepartamentos()
      .then((response) => {
        console.log(response);
        setDataDepartamento(response.data);
        setLoadedDepartamento(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedDepartamento(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  // Lista de Puestos
  const [dataPuesto, setDataPuesto] = useState([]);
  const [loadedPuesto, setLoadedPuesto] = useState(false);
  useEffect(() => {
    PuestoService.getPuestos()
      .then((response) => {
        console.log(response);
        setDataPuesto(response.data);
        setLoadedPuesto(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedPuesto(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  // Lista de Roles
  const [dataRol, setDataRol] = useState([]);
  const [loadedRol, setLoadedRol] = useState(false);
  useEffect(() => {
    RolService.getRoles()
      .then((response) => {
        console.log(response);
        setDataRol(response.data);
        setLoadedRol(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedRol(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Typography variant="h5" gutterBottom>
              Crear Usuario
            </Typography>
          </Grid>

          {/* Información Personal */}
          <Grid size={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Información Personal
            </Typography>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="apellido1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="apellido1"
                    label="Primer Apellido"
                    error={Boolean(errors.apellido1)}
                    helperText={errors.apellido1 ? errors.apellido1.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="apellido2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="apellido2"
                    label="Segundo Apellido (Opcional)"
                    error={Boolean(errors.apellido2)}
                    helperText={errors.apellido2 ? errors.apellido2.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Información de Contacto */}
          <Grid size={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Información de Contacto
            </Typography>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="telefono"
                    label="Teléfono"
                    placeholder="87770123"
                    error={Boolean(errors.telefono)}
                    helperText={errors.telefono ? errors.telefono.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="correo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="correo"
                    label="Correo Electrónico"
                    type="email"
                    error={Boolean(errors.correo)}
                    helperText={errors.correo ? errors.correo.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="direccion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="direccion"
                    label="Dirección"
                    error={Boolean(errors.direccion)}
                    helperText={errors.direccion ? errors.direccion.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* Información Laboral */}
          <Grid size={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Información Laboral
            </Typography>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="fechaIngreso"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fechaIngreso"
                    label="Fecha de Ingreso"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.fechaIngreso)}
                    helperText={errors.fechaIngreso ? errors.fechaIngreso.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="salario"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="salario"
                    label="Salario"
                    type="number"
                    error={Boolean(errors.salario)}
                    helperText={errors.salario ? errors.salario.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="saldoVacaciones"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="saldoVacaciones"
                    label="Saldo de Vacaciones (días)"
                    type="number"
                    error={Boolean(errors.saldoVacaciones)}
                    helperText={
                      errors.saldoVacaciones ? errors.saldoVacaciones.message : ''
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="numerodeCuenta"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="numerodeCuenta"
                    label="Número de Cuenta"
                    placeholder="CR0123456789012345"
                    error={Boolean(errors.numerodeCuenta)}
                    helperText={
                      errors.numerodeCuenta ? errors.numerodeCuenta.message : ''
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="estado"
                control={control}
                render={({ field }) => (
                  <SelectEstado
                    field={field}
                    error={Boolean(errors.estado)}
                  />
                )}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.estado ? errors.estado.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Asignaciones */}
          <Grid size={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Asignaciones
            </Typography>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedDepartamento && (
                <Controller
                  name="idDepartamento"
                  control={control}
                  render={({ field }) => (
                    <SelectDepartamento field={field} data={dataDepartamento} />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.idDepartamento ? errors.idDepartamento.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedPuesto && (
                <Controller
                  name="idPuesto"
                  control={control}
                  render={({ field }) => (
                    <SelectPuesto field={field} data={dataPuesto} />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.idPuesto ? errors.idPuesto.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedRol && (
                <Controller
                  name="idRol"
                  control={control}
                  render={({ field }) => <SelectRol field={field} data={dataRol} />}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.idRol ? errors.idRol.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
            >
              Guardar Usuario
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ m: 1 }}
              onClick={() => navigate('/usuarios')}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}