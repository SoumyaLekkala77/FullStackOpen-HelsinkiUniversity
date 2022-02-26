import React from "react";

const ListCountry = (props) =>
    <div>
        {props.countries.map( country =>
            <div key={country.name.common}>
                {country.name.common}
                <button onClick={props.selectHandler} value={country.name.common}> show </button>
            </div>
        )}
    </div>

export default ListCountry