import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}
const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}
const VoteCount = ({points}) => {
  return(
    <p>has {points} votes</p>
    )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0,1:0,2:0,3:0,4:0,5:0})
  
  const handleClickAnekdote = () => {
    setSelected(Math.floor(Math.random() * 6));
  }

  const handleClickVote = () => {
    let copy = {...points};
    copy[selected] +=1;
    setPoints(copy);
  }
  const mostPoints = () => {
    let max = 0;
    let i = 0;
    const values = Object.values(points);
    values.forEach(value => {
      if(value > max){
        max = i;
      }
      i += 1;
    });
    return max;
  }
  return (
    <div>
      <Header text="Anecdote of the day" /> 
      {props.anecdotes[selected]}
      <VoteCount points={points[selected]} />
      <Button handleClick={handleClickAnekdote} text="next anekdote"/>
      <Button handleClick={handleClickVote} text="vote" />
      <Header text="Anecdote with most votes" />
      {props.anecdotes[mostPoints()]}
      <VoteCount points={points[mostPoints()]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)