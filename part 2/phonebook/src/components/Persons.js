import React from "react";

const Persons = (props) =>
    <div>
        {props.personsToShow.map( person => <div key={person.id}> {person.name} {person.number} </div> )}
    </div>

export default Persons