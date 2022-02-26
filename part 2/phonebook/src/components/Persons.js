import React from "react";

const Persons = (props) =>
    <div>
        {props.personsToShow.map( person => <div key={person.id}> {person.name} {person.number} <button onClick={() => props.deleteHandler(person.id)}>delete</button> </div> )}
    </div>

export default Persons