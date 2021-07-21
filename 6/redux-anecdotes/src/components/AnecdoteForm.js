import React from 'react';
import { useDispatch } from 'react-redux'
import { newAnectode } from '../reducers/anecdoteReducer';
import { setNotification, zero } from '../reducers/notificationReducer';

const AnectodeForm = () => {

    const dispatch = useDispatch();

    const addAnectode = (event) => {
        event.preventDefault();
        const data = event.target.anecdote.value;
        console.log(data);
        dispatch(newAnectode(data));
        dispatch(setNotification(`You added: ${data}`))
        setTimeout(()=> dispatch(zero()), 5000);
        event.target.anecdote.value = '';
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnectode}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
export default AnectodeForm;