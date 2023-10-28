import axios from "axios";
import { FilterRequest, PersonResponse, PersonResquet } from "../interfaces/interfaces";
import { API_ENDPOINT } from "./contans";

const PERSON_ENDPOINT: string = `${API_ENDPOINT}/person`

class PersonService {
  addPerson = async (request: PersonResquet) => {
    return await axios.post<PersonResponse>(`${PERSON_ENDPOINT}`, request)
      .then(response => response.data)
      .catch(error => error.response.data)
  }

  editPerson = async (request: PersonResquet, id: number) => {
    return await axios.put<PersonResponse>(`${PERSON_ENDPOINT}/editar?id=${id}`, request)
      .then(response => response.data)
      .catch(error => console.log(`error desde person edit: `, error))
  }

  deletePerson = async (id: number) => {
    return axios.delete<boolean>(`${PERSON_ENDPOINT}/delete?id=${id}`)
      .then(response => response.data)
      .catch(error => console.log(`error desde delete person: `, error))
  }

  getPeople = async (filterRequest: FilterRequest) => {
    return axios.get<PersonResponse[]>(`${PERSON_ENDPOINT}?name=${filterRequest.name}&documentType=${filterRequest.documentType}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          // Error de respuesta HTTP (por ejemplo, código de estado no exitoso)
          console.log('',error.response.data);
          return error.response;
        } else if (error.request) {
          // No se recibió ninguna respuesta del servidor
          console.log('error en el servidor',error.request);
          return error;
        } else {
          // Error al configurar la solicitud
          console.log('Error al configurar', error.message);
          return error;
        }
        console.log(error.config);
      })
  }
}

export default new PersonService();