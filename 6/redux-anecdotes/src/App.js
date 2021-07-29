import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  })

  return (
    
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnectodeForm/>
    </div>
  )
}

export default App