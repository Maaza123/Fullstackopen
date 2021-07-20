import React from 'react';
import { useState } from 'react';
import users from '../services/users.js';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    try{
      event.preventDefault();
      await users.registerUser({ username, name, password });
    }catch(error){
      console.log(error);
    }





  };

  return(
    <form id='registerForm' onSubmit={handleSubmit}>
      <div>
            username:
        <input
          type="text"
          id="userName"
          value={username}
          name="userName"
          onChange={({ target }) => setUserName(target.value)}/>
      </div>
      <div>
            name:
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={({ target }) => setName(target.value)}/>
      </div>
      <div>
            password:
        <input
          type="text"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;