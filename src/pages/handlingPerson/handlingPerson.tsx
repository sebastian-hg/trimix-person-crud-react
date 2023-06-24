import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorDetail, PersonResquet } from '../../interfaces/interfaces';
import personService from '../../services/personService';

const DataPerson = () => {

  //states and variables
  const state = useLocation();

  //hooks
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();

  //variables
  let errorMessage:ErrorDetail|null = null;

  //functions
  const handlerGoBack = () => {
    navigate('/');
  };

  const hadlerGetDataSubmit = (data) => {

    if (state.state.data.name === null) {

      const bodyRequest: PersonResquet = {
        name: data.name,
        surname: data.surname,
        documentType: data.typeDocument,
        documentNumber: data.document,
        birthdate: data.birthdate!
      }

      personService.addPerson(bodyRequest)
        .then(data => {
          console.log(data)
          if (data.errorCode) {
            errorMessage = data.errorCode;
          } else {
            errorMessage = null;
            handlerGoBack();
          }
        })
        .catch(error => console.log(`error desde add Person: `, error));
    } else {

      const bodyRequest: PersonResquet = {
        name: data.name,
        surname: data.surname,
        documentType: data.typeDocument,
        documentNumber: data.document,
        birthdate: data.birthdate!
      }

      personService.editPerson(bodyRequest, state.state.data.id)
        .then(handlerGoBack)
        .catch(error => console.log(`error desde add Person: `, error));
    }
  }

  return (
    <Box className='container mt-2'>
      <Box className='mb-3'>
        <ArrowBackIosNewIcon sx={{ color: 'blue' }} />
        <button className='btn btn-animated font-button-back' onClick={handlerGoBack} > Volver </button>
      </Box>
      <Card className='card-design'>
        <CardContent>
          <Typography className='font-detail-card'> Datos Generales</Typography>
          <form onSubmit={handleSubmit(hadlerGetDataSubmit)}>
            <Box className='row mt-2'>
              <Box className='col-sm-4 col-12'>
                <input
                  placeholder='name'
                  type='text'
                  defaultValue={state.state.data.name === null ? '' : state.state.data.name}
                  {...register('name', { required: true, minLength: 3, maxLength: 20 })}
                />
                {errors.name && (<Typography className='error-msg'>Ha cometido un error, el campo es obligatorio*</Typography>)}
              </Box>
              <Box className='col-sm-4 col-12'>
                <input
                  id='surname'
                  placeholder='Apellido'
                  type='text'
                  defaultValue={state.state.data.surname === null ? '' : state.state.data.surname}
                  {...register('surname', { required: true, minLength: 3, maxLength: 20 })}
                />
                {errors.surname && (<Typography className='error-msg'>Ha cometido un error, el campo es obligatorio*</Typography>)}
              </Box>
              <Box className='col-sm-4 col-12'>
                <input
                  id='document'
                  placeholder='Número de Documento'
                  type='number'
                  defaultValue={state.state.data.document_number === null ? '' : state.state.data.document_number}
                  {...register('document', { required: true, minLength: 3, maxLength: 20 })}
                />
                {errors.document && (<Typography className='error-msg'>Ha cometido un error, el campo es obligatorio*</Typography>)}
              </Box>
            </Box>
            <Box className='row mt-3'>
              <Box className='col-sm-4 col-12'>
                <select
                  className='input-size'
                  id='document'
                  placeholder='Tipo de Documento'
                  defaultValue={state.state.data.document_type === null ? '' : state.state.data.document_type}
                  {...register('typeDocument', { required: true })}
                >
                  <option value='Dni'>Dni</option>
                  <option value='Pasaporte'>Pasaporte</option>
                  <option value="Cedula">Cédula</option>
                </select>
                {errors.typeDocument && (<Typography className='error-msg'>Ha cometido un error, el campo es obligatorio*</Typography>)}
              </Box>
              <Box className='col-sm-4 col-12'>
                <input
                  className='input-size'
                  id='document'
                  placeholder='Fecha de Nacimiento'
                  type='date'
                  defaultValue={state.state.data.birthdate === null ? '' : state.state.data.birthdate}
                  {...register('birthdate', { required: true })}
                />
                {errors.birthdate && (<Typography className='error-msg'>Ha cometido un error, el campo es obligatorio*</Typography>)}
              </Box >
              <Box className='col-sm-4 col-12'>
                <Button type='submit' endIcon={<SaveIcon />} className='d-flex vertical-alings-center' variant='contained'> Guardar</Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
      {
        errorMessage &&
        <Box>
          hola
        </Box>
      }
    </Box>
  )
}

export default DataPerson;