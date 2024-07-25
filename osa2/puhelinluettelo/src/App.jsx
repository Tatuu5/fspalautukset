import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltering, setNewFiltering] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
        .getAll()
        .then(initialPeople => {
            setPersons(initialPeople)
        })
        .catch(error => {console.log('fail')})
}, [])
  console.log('render', persons.length, 'people')
  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const namefiltering = persons.some(person => person.name === newName)
    
    if (namefiltering) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personService.updatePerson(personToUpdate.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => setSuccessMessage(null), 2500)
        })
        .catch(error => {
          console.log('Error updating person', error)
          setErrorMessage(`Information of ${personToUpdate.name} has already been removed from server`)
          setTimeout(() => setErrorMessage(null), 2500)
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
        })
        
      }
    } else {
      personService.submitToServer(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setSuccessMessage(null), 2500)
      })
      .catch(error => {
        console.log('error')
      })
    }


  }

  const handleNewName = (event) => {
    /*console.log(event.target.value)*/
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    console.log(event.target.value)
    setNewFiltering(event.target.value.toLowerCase())
  }

  const deletePerson = ( person ) => {

    if (window.confirm(`Delete ${person.name} ?`))
      personService.deleteFromServer(person.id)
      .then(response => {setPersons(persons.filter(p => p.id !== person.id))
        console.log('person deleted succesfully')
        setSuccessMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2500)
      })
      .catch(error => {
        console.log('Error updating person', error)
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => setErrorMessage(null), 2500)
        setPersons(persons.filter(p => p.id !== person.id))
      })
      
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFiltering))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter filtering={newFiltering} onChangeFilter={handleFiltering}/>

      <h3>Add a new</h3>

      <PersonForm 
      onSubmit={addPerson}
      nameValue={newName}
      nameOnChange={handleNewName}
      numberValue={newNumber}
      numberOnChange={handleNewNumber} 
      />
      
      <h3>Numbers</h3>

      <Persons people={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )

}




export default App