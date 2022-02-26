import React, {useState, useEffect} from "react";
import CountryDetail from "./components/CountryDetail";
import ListCountry from "./components/ListCountries";
import Filter from "./components/Filter";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([])
    const [findQuery, setFindQuery] = useState('')
    const [weatherAccessKey] = useState(process.env.REACT_APP_WEATHERSTACK_API_KEY)

    useEffect( () => {
        axios.get("https://restcountries.com/v3.1/all")
            .then( response => setCountries(response.data))
    }, [] )

    const filterChangeHandler = event => setFindQuery( event.target.value )
    const filteredResult = countries.filter( c => c.name.common.toLowerCase().startsWith(findQuery.toLowerCase()))

    return (
    <div>
        <Filter currentQuery={findQuery} handleQueryChange={filterChangeHandler}  />
        {
            filteredResult.length > 10
                ? <p>Too many matches, specify another filter </p>
                : filteredResult.length === 1
                    ? <CountryDetail country={filteredResult[0]} weatherAccessKey={weatherAccessKey}/>
                    : <ListCountry countries={filteredResult} selectHandler={filterChangeHandler} />
        }
    </div>
  );
}

export default App;
