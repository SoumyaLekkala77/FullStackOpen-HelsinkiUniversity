import axios from "axios";

const baseUrl = "api/persons"

const addPerson = newEntry => {
    return axios.post(baseUrl, newEntry).then( response => response.data )
        .catch( error => {
            console.log("Failed to add new person", error)
            throw error
        } )
}

const getAllPersons = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const updatePerson = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
        .then(response => response.data)
        .catch( error => {
            console.log("Failed to update the person")
            throw error
        } )
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then( response => response.data )
    .catch( error => console.log("Failed to delete") )
}

export default {addPerson, updatePerson, getAllPersons, deletePerson}