import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltering, setNewFiltering] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
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
    : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
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

      <Persons people={filteredPersons}/>
    </div>
  )

}

const Persons = ( {people} ) => {
  return(
    <div>
      {people.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
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
    filter shown with <input value={props.filtering} onChange={props.onChangeFilter}/>
  </div>
  )
}

export default App