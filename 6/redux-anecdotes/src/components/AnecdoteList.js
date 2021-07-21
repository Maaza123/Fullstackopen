import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { like } from '../reducers/anecdoteReducer';
import { setNotification, zero } from '../reducers/notificationReducer';


const AnecdoteList = () => {

    
    const anecdotes = useSelector(state =>{
        if(state.filter === ''){
            return state.anecdotes;
        }else{
            return [...state.anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(state.filter));
        }
    })
    const dispatch = useDispatch();

    const vote = (id) => {
      dispatch(like(id));
      const votedAnecdote = anecdotes.find(n=> n.id = id);
      dispatch(setNotification(`You voted: ${votedAnecdote.content}`))
      console.log('vote', id)
      setTimeout(() => dispatch(zero()), 5000);
    }
    return(
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
            <div>
                has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
      )}
        </div>
    )
}
export default AnecdoteList;