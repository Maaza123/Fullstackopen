import React, {useState} from "react";

const Loginform = ({
    handleLogin
    }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handlePasswordChange = (target) => {
        setPassword(target.value);
      }
    
    const handleNameChange = (target) => {
        setUsername(target.value);
      }
      return (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleNameChange}
            />
          </div>
          <div>
            password
            <input
            type="text"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      )
    }

export default Loginform;