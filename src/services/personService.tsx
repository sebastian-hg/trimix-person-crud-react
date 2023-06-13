import axios from "axios";
import { FilterRequest, PersonResponse, PersonResquet } from "../interfaces/interfaces";
import { API_ENDPOINT } from "./contans";

const PERSON_ENDPOINT: string = `${API_ENDPOINT}/person`

class PersonService {
  addPerson = async (request: PersonResquet) => {
    return axios.post<PersonResponse>(`${PERSON_ENDPOINT}`, request )
      .then(response => response.data)
      .catch(error => console.log(`error desde person add: `, error))
  }

  editPerson = async (request: PersonResquet, id: number) => {
    return axios.put<PersonResponse>(`${PERSON_ENDPOINT}/editar?id=${id}`, request)
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
      .catch(error => console.log(`error desde get Person: `, error, 'request:', filterRequest))
  }
}

export default new PersonService();