import React, { useEffect } from 'react'
import { useState } from 'react'
import { LOGIN } from '../queries/user'
import {useMutation} from '@apollo/client'
const LoginForm = ({setToken, show, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userLogin, result] = useMutation(LOGIN, {

    })
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('username: ', username, 'password: ', password)
        userLogin( {variables: {username, password}})
        setPage('authors')

    }

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('books-user-token', token)
        }
    }, [result.data]) // eslint-disable-line
    if(!show){
        return null
    }
    return(
    <div>
        <h2>Login:</h2>
        <form onSubmit={handleSubmit}>
            <div>
                username:
                <input
                    value={username}
                    name='username'
                    onChange={({target}) => setUsername(target.value)}
                    />
            </div>
            <div>
                password:
                <input
                value={password}
                name='password'
                onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type='submit'>
                login
            </button>
        </form>

    </div>)
}
export default LoginForm