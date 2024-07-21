import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltering, setNewFiltering] = useState('')

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
    namefiltering 
    ? alert(`${newName} is already added to phonebook`) 
    : personService.submitToServer(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {console.log('fail')})

  
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
      })
      .catch(error => {
        console.log('Error deleting person', error)
      })
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFiltering))

  return (
    <div>
      <h2>Phonebook</h2>

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

const Persons = ( {people, deletePerson} ) => {
  return(
    <div>
      {people.map(person => 
        <div key={person.name}> {person.name} {person.number} 
        <button onClick={() => deletePerson(person)}>delete</button></div>)}
    </div>
  )
}

const PersonForm = (props) => {
  return(
  <div>
    <form onSubmit={props.onSubmit}>
        <div>
          name: 
          <input
             value={props.nameValue} 
             onChange={props.nameOnChange}
             name="name_text" />
        </div>
        <div>
          number: <input 
          value={props.numberValue} 
          onChange={props.numberOnChange} 
          name="number_text"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )
}

const Filter = (props) => {
  return(
  <div>
    filter shown with <input value={props.filtering} onChange={props.onChangeFilter} name="filter"/>
  </div>
  )
}

export default App