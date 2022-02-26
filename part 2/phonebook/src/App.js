import React, {useState, useEffect} from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/PersonService";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    useEffect( () =>{
        personService.getAllPersons()
            .then( allEntries => setPersons(allEntries) )
        }, [])

    const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toUpperCase().startsWith(filter.toUpperCase()))

    const setNotification = (message, isError) => {
        if (isError) setError(message)
        else setMessage(message)
        setTimeout( () => isError ? setError(null) : setMessage(null), 5000 )
    }

    const addName = (event) => {
        event.preventDefault()
        const data = {name: newName.trim(), number: newNumber}
        const duplicates = persons.filter(p => p.name === newName.trim())
        if (
            duplicates.length > 0 &&
            window.confirm(`${duplicates[0].name} is already added to phonebook, replace the old number with a new one?`)
        ){
            personService.updatePerson(duplicates[0].id, data)
                .then( updatedPerson => {
                    if (updatedPerson == null){
                        setNotification(`Information of ${duplicates[0].name} has already been removed from server`, true)
                        return
                    }
                    console.log("updating person now..")
                    setPersons( persons.map( p => p.id === duplicates[0].id ? updatedPerson : p ) )
                    setNotification(`Updated number of ${updatedPerson.name}`, false)
                })
        }else {
            personService.addPerson( data )
                .then( newPerson => {
                    setPersons( persons.concat(newPerson) )
                    setNotification(`Added ${newPerson.name}`, false)
                })
        }

        setNewName("")
        setNewNumber("")
    }

    const removePerson = (id) => {
        const person = persons.find( p => p.id === id )
        if ( window.confirm(`Delete ${person.name}?`) )
            personService.deletePerson(id)
                .then( response => {
                    if (response == null){
                        setNotification(`Information of ${person.name} has already been removed from server`, true)
                        return
                    }
                    setPersons( persons.filter(p => p.id !== id))
                    setNotification(`Removed person ${person.name}`, false)
                })
    }
    
    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={false} />
            <Notification message={error} isError={true} />
            <Filter filter={filter} changeHandler={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                newNameChangeHandler={handleNewNameChange}
                newNumber={newNumber}
                newNumberChangeHandler={handleNewNumberChange}
                addName={addName}/>
            <h3>numbers</h3>
            <Persons personsToShow={personsToShow} deleteHandler={removePerson}/>
        </div>
    )
}

export default App
