import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      anecdotes.forEach(anecdote => {
          dispatch({type:'NEW_ANECDOTE', data: anecdote})
      })
  )
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