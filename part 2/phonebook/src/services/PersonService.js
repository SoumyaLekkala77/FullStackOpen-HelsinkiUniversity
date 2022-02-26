import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const addPerson = newEntry => {
    return axios.post(baseUrl, newEntry).then( response => response.data )
}

const updatePerson = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
        .then(response => response.data)
}

const getAllPersons = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
      .then( response => response.data )
      .catch( error => console.log("Failed to delete", error) )
}

export default {addPerson, updatePerson, getAllPersons, deletePerson}