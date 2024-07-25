const Persons = ( {people, deletePerson} ) => {
    return(
      <div>
        {people.map(person => 
          <div key={person.name}> {person.name} {person.number} 
          <button onClick={() => deletePerson(person)}>delete</button></div>)}
      </div>
    )
  }

export default Persons