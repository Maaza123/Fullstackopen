import React from 'react';
import { connect } from 'react-redux'
import { newAnectode } from '../reducers/anecdoteReducer';
import { setNewNotification } from '../reducers/notificationReducer';

const AnectodeForm = (props) => {

    const addAnectode = (event) => {
        event.preventDefault();
        const data = event.target.anecdote.value;
        console.log(data);
        props.newAnectode(data);
        props.setNewNotification(`You added: ${data}`, 5000);
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

const mapDispatchToProps = {
    newAnectode, setNewNotification
}

export default connect(null, mapDispatchToProps)(AnectodeForm);