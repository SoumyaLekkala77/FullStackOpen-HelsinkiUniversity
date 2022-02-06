import React, { useState } from 'react'

const Button = ({handleClick, name}) => {
return <button onClick={handleClick}> {name} </button>
}

const StatisticLine = ({name, value}) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = good / all * 100;
  if (all === 0){ 
      return <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
  }
    return <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr><StatisticLine name="good" value={good} /></tr>
            <tr><StatisticLine name="neutral" value={neutral} /></tr>
            <tr><StatisticLine name="bad" value={bad} /></tr> 
            <tr><StatisticLine name="all" value={all} /></tr>
            <tr><StatisticLine name="average" value={average} /></tr>  
            <tr><StatisticLine name="positive" value={positive} /></tr>     
          </tbody>
        </table>
    </div>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
       <h1>give feedback</h1>
           <Button handleClick={ () => setGood(good+1)} name="good" />
           <Button handleClick={ () => setNeutral(neutral+1)} name="neutral" />
           <Button handleClick={ () => setBad(bad+1)} name="bad" />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
            />
    </div>
  )
}

export default App