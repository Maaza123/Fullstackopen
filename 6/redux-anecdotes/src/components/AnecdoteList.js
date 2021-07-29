import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { like } from '../reducers/anecdoteReducer';
import { setNewNotification } from '../reducers/notificationReducer';


const AnecdoteList = () => {

    
    const anecdotes = useSelector(state =>{
        if(state.filter === ''){
            return state.anecdotes;
        }else{
            return [...state.anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(state.filter));
        }
    })
    const dispatch = useDispatch();

    const vote = (anecdote) => {
      dispatch(like(anecdote));
      
      dispatch(setNewNotification(`You voted: ${anecdote.content}`, 5000));
      console.log('vote', anecdote.id)

    }
    const padding = {
        'padding': 5,
        'padding-left': 3,
        'border-style': 'solid',
        'border-width': 1
    }

    const text = {
        fontFamily: 'Courier New',
        fontSize: 15 
    }
    return(
        <div>
        {anecdotes.map(anecdote =>
            <div style={padding} key={anecdote.id}>
                <div style={text}>
                    {anecdote.content}
                </div>
            <div>
                votes: {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
      )}
        </div>
    )
}
export default AnecdoteList;