
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Modal, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../index.scss';
import { FilterRequest, PersonRedux, PersonResponse } from '../../interfaces/interfaces';
import personService from '../../services/personService';
import {addUsers} from '../../redux/userSlice'

const FilterPage = () => {

  const [people, setPeople] = useState<PersonResponse[]>([]);
  const [findFilter, setFindFilter] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [idDelete, setDelete] = useState<number>(0);
  const headerOptions = ['ID', 'Name', 'Apellido', 'Número Documento', 'Tipo Documento', 'Fecha Nacimiento', 'Modificar', 'Eliminar'];

  //hooks
  const navigate = useNavigate();
  const dispactch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();

  //functions
  const hadlerGetDataSubmit = (data) => {

    const bodyRequest: FilterRequest = {
      name: data.name,
      documentType: data.typeDocument
    }
    personService.getPeople(bodyRequest)
      .then(data => {
        setPeople(data!)
        setFindFilter(true);
        dispactch(addUsers(data!))
      }), (error: any) => {
        console.log('error en service', error)
      }
  }

  const hadlerGoToAdd = () => {
    const data: PersonResponse = {
      id: null,
      name: null,
      surname: null,
      document_number: null,
      document_type: null,
      birthdate: null
    }
    navigate('/editar', { state: { data: data } })
  }

  const hadlerGoToEdit = (data) => {
    navigate('/editar', { state: { data: data } })
  }

  const handlerDelete = (dataa) => {
    setDelete(dataa.id)
    handleOpen();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteModal = () => {
    personService.deletePerson(idDelete)
      .then(data => {
        console.log('se eliminino el registro con el id: ', idDelete)
      }), (error: any) => {
        console.log('error en service', error)
      }
    updateListPerson(idDelete);
    handleClose();
    alert("Los datos del material han sido eliminados.");
  };

  const updateListPerson = (id) => {
    const updatedData = people!.filter((obj) => obj.id !== id);
    setPeople(updatedData);
  };


  return (
    <Box className='container mt-3'>
      <Box className='mt-4 mb-4 d-flex justify-content-between'>
        <Typography className='font-title-pricipal'> Registro de Empleados</Typography>
        <Button sx={{ background: 'green' }} endIcon={<AddIcon />} variant='contained' onClick={hadlerGoToAdd}> Agregar</Button>
      </Box>
      <Card className='card-design'>
        <CardContent>
          <Typography className='font-detail-card'> Filtros </Typography>
          <form onSubmit={handleSubmit(hadlerGetDataSubmit)}>
            <Box className='row mt-2 '>
              <Box className='col-sm-4 col-12'>
                <input
                  {...register('name')}
                  placeholder='name'
                  type='text'
                />
              </Box>
              <Box className='col-sm-4 col-12'>
                <select
                  className='input-size'
                  {...register('typeDocument')}
                  id='document'
                  placeholder='Tipo de Documento'
                >
                  <option value={'null'}>Seleccione tipo de Documento</option>
                  <option value='Dni'>Dni</option>
                  <option value='Pasaporte'>Pasaporte</option>
                  <option value="Cedula">Cédula</option>
                </select>
              </Box>
              <Box className='mt-4 d-flex justify-content-end'>
                <Button type='submit' endIcon={<SearchIcon />} variant='contained'> Buscar</Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
      {(findFilter) &&
        <Box>
          {(people!.length > 1) ?
            <Accordion defaultExpanded className='card-design mt-4 '>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className='font-detail-card '>Resultados</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box className='me-table'>
                  <TableRow>
                    {headerOptions.map((header, index) => {
                      return (
                        <TableCell key={index}>
                          {headerOptions[index]}
                        </TableCell>
                      )
                    })
                    }
                  </TableRow>
                  <TableBody>
                    {people!.map((person, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell component={'th'} scope='row'> {person.id}</TableCell>
                          <TableCell component={'th'} scope='row'> {person.name}</TableCell>
                          <TableCell component={'th'} scope='row'> {person.surname}</TableCell>
                          <TableCell component={'th'} scope='row'> {person.document_number}</TableCell>
                          <TableCell component={'th'} scope='row'> {person.document_type}</TableCell>
                          <TableCell component={'th'} scope='row'> {person.birthdate}</TableCell>
                          <TableCell component={'th'} scope='row'><Button onClick={() => { hadlerGoToEdit(person) }} endIcon={<EditIcon />}>Editar</Button> </TableCell>
                          <TableCell component={'th'} scope='row'> <Button onClick={() => { handlerDelete(person) }} endIcon={<DeleteForeverIcon />}>Eliminar</Button></TableCell>
                        </TableRow>
                      )
                    })
                    }

                  </TableBody>
                </Box>
              </AccordionDetails>
            </Accordion>
            :
            <Typography className='text-error-filter'> No se han encotrados Resultados para la búsqueda Seleccionada, por favor intente de nuevo.</Typography>
          }
        </Box>
      }
      <div>
        <Modal open={open} onClose={handleClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              outline: "none",
              borderRadius: "4px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Eliminar Resgistro de Persona
            </Typography>
            <Typography variant="body1" gutterBottom>
              ¿Estás seguro de que deseas eliminar este registro?
            </Typography>
            <div style={{ textAlign: "right" }}>
              <Button variant="contained" sx={{ backgroundColor: 'red', marginRight: '10px' }} onClick={handleDeleteModal}>
                Eliminar
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Box>

  )
}

export default FilterPage;