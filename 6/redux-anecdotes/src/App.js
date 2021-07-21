import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'

const App = () => {
 

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