import React from "react";
import Weather from "./CountryWeather";

const CountryDetail = ( props ) => {
        const languages = Object.entries( props.country.languages ).map( l =>l[1])
        return <div>
                <h1>{props.country.name.common}</h1>
                capital {props.country.capital[0]}<br/>
                population {props.country.population}
                <h2>Spoken languages</h2>
                <ul> {languages.map( l => <li key={l}>{l}</li> )} </ul>
                <img alt={"flag"} src={props.country.flags.png}/>
                <Weather cityName={props.country.capital[0]} apiKey={props.weatherAccessKey} />
        </div>
}
export default CountryDetail