import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from '../../phonebook/src/components/Filter'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })  
  }, [])


  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>

        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map((values, i) => <li key={i}>{values[1]}</li>)}
        </ul>

        <img src={country.flags.svg} alt={country.flags.alt} />;
      </div>
    )
  }

  const CountryList = ({countries}) => {
    if (countries  != null) {
      if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
      }
      else if (countries.length > 1) {
        return (
          <div>
          {countries.map(c => (
            <div>
              <p key={c['name']['common']}>{c['name']['common']} <button>Show</button></p>
            </div>
          ))}
          </div>
        )
      } else if (countries.length === 1) {
        return <Country country={countries[0]} />
      } 
    }
  }

  const filteredCountries = query === '' ? null : countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      find countries <input value={query} onChange={handleCountryChange}/>

      <CountryList countries={filteredCountries} />
    </>
  )
}

export default App
