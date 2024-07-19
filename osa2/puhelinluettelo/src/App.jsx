import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFiltering, setNewFiltering] = useState('')

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
      filter shown with <input value={newFiltering} onChange={handleFiltering}/>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input
             value={newName} 
             onChange={handleNewName}
             name="name_text" />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={handleNewNumber} 
          name="number_text"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
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

export default App