import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [newFiltering, setNewFiltering] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
            setCountries(response.data)
            console.log('Fetched all countries')
            /*console.log(countries)*/
        })
        .catch(error => {
            console.error('Error fetching all countries:', error)
        })
  }, [])

  
  const handleFiltering = (event) => {
    console.log(event.target.value)
    setNewFiltering(event.target.value.toLowerCase())
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFiltering))


  return (
    <div>
      <Find filtering={newFiltering} onChangeFilter={handleFiltering}/>
      <div>COUNTRIES</div>
      <Countries listOfCountries={filteredCountries}/>
    </div>
  )
}

const Find = (props) => {
  return (
    <div>
      find countries <input value={props.filtering} onChange={props.onChangeFilter} />
    </div>
  )
}

const Countries = ({ listOfCountries }) => {
  /*console.log(listOfCountries)*/
  if (listOfCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (listOfCountries.length === 1) {
    return <Country country={listOfCountries[0]}/>
  } else {
    return (
      <div>
        {listOfCountries.map(country => 
          <div key={country.name.official}>{country.name.common}</div>
        )}
      </div>
    )
  }
}

const Country = ({ country }) => {
  console.log(country)
  /*console.log(country.languages)
  console.log(country.flags)*/
  const languages = Object.values(country.languages)
  const flagInfo = country.flags
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages: </h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
    <img src={flagInfo.png} alt={flagInfo.alt}/>
    </div>
  )
}

export default App