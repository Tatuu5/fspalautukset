import { useState, useEffect } from 'react'
import axios from 'axios'
const key = import.meta.env.VITE_W_KEY

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

  const showCountry = ({ country }) => {
    console.log(country)
    setNewFiltering(country.name.common.toLowerCase())
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFiltering))


  return (
    <div>
      <Find filtering={newFiltering} onChangeFilter={handleFiltering}/>
      <Countries listOfCountries={filteredCountries} showCountry={showCountry}/>
    </div>
  )
}

const Find = (props) => {
  return (
    <div>
      find countries <input name="search" value={props.filtering} onChange={props.onChangeFilter} />
    </div>
  )
}

const Countries = ({ listOfCountries, showCountry }) => {
  /*console.log(listOfCountries)*/
  if (listOfCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (listOfCountries.length === 1) {
    return <Country country={listOfCountries[0]} />
  } else {
    return (
      <div>
        {listOfCountries.map(country => 
          <div key={country.name.official}>{country.name.common}
          <button onClick={() => showCountry({country})}>show</button></div>
        )}
      </div>
    )
  }
}

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${key}&units=metric`)           
    .then(response => {
      setWeatherData(response.data)
      console.log("fetched data", response.data)
    })
    .catch(error => {
      console.log('error fetching', error)
    })
  }, [])

  

  const languages = Object.values(country.languages)
  const flagInfo = country.flags
  if (weatherData) {
  console.log(weatherData.weather.icon)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages: </h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
    <img src={flagInfo.png} alt={flagInfo.alt}/>
    <h2>Weather in {country.capital[0]}</h2>
    <div>temperature {weatherData.main.temp} Celsius</div>
    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
    <div>wind {weatherData.wind.speed} m/s</div>
    </div>
  )
  } else {
    return ("Loading country information")
  }
}

export default App