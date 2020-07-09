import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
    <h1>
      {props.text}
    </h1>
  )
}
const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>{props.text}</button>   
  )
}
const StatisticLine = (props) => {
  const {text, score} = props;
  
  return(
    <tr>
      <td>
        {text}
      </td>
      <td>
        {score}
      </td> 
    </tr>
  )
}
const Statistics = ({states}) => {
  return(
    <table>
      <tbody>
        <StatisticLine text="good" score={states.good} />
        <StatisticLine text="neutral" score={states.neutral} />
        <StatisticLine text="bad" score={states.bad} />
        <StatisticLine text="all" score={states.clicks}/>
        <StatisticLine text="average" score={states.average}/>
        <StatisticLine text="positive" score={states.positive + " %"}/>
      </tbody>
  </table>
  )    
}
const History = ({states}) =>{
  if(states.clicks !== 0) {
    return(
       <Statistics states={states}/> 
    )}
  else{
    return(
      <p>No feedback given</p>
    )
  }
    
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>{
    setGood(good + 1);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }
  const handleBad = () => {
    setBad(bad + 1);
  }
  const average = (good - bad) / (good + neutral + bad);
  const clicks = 0 + good + neutral + bad;
  const positive = 100 * good / (good + neutral + bad);
  const states = {
    "clicks" : clicks,
    "positive" : positive,
    "average" : average,
    "good" : good,
    "bad" : bad,
    "neutral" : neutral
  }
  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad"/>
      <Header text ="statistics" />
      <History states={states}/>
      
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
