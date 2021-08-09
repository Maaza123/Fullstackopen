import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {login} from '../reducers/userReducer'
import { useHistory } from 'react-router';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login({username, password}))
    setUsername('');
    setPassword('');

  };
  return (
    <div>
      <h1>Login:</h1>
      <form onSubmit={handleSubmit} id='loginForm'>
      <div>
            username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
            password
        <input
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
    
  );
};

export default LoginForm;