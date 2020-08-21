import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const ErrorPop = ({message}) => {
  if(message ===null){
    return null
  }

  return(
    <div className='error'>
      {message}
    </div>
  )
}

const MessagePop = ({message}) => {
  if(message ===null){
    return null
  }

  return(
    <div className='message'>
      {message}
    </div>
  )
}
const RenderName = ({user, onClick}) => (
    <div>
      <h3>Logged in as {user.name}<button onClick={onClick}>logout</button></h3>
    </div>
  )

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if(userJson){
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token);
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);  
  }

  const createBlog = async (event) => {
    event.preventDefault();
    try{
      const response = await blogService.create({
        title, author, url  
      })
      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
      setAuthor('');
      setTitle('');
      setUrl('');
      handleMessagePop(`Created new blog`)
    }catch(error){
      const stringified = JSON.stringify(error.response.data);
      handleErrorPop(stringified);
    }
  }
  const handleErrorPop = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }
  const handleMessagePop = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      blogService.setToken(user.token);
      setUser(user);
      setUsername('')
      setPassword('')
      handleMessagePop(`Welcome ${user.name}`)
    } catch(error) {
      const stringified = JSON.stringify(error.response.data);
      handleErrorPop(stringified);
      setUser(user);
      setUsername('')
      setPassword('')
    }
  }
  const blogsView = () => (
    <div>
      <RenderName user={user} onClick={handleLogout}/>
      <br/>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        
      <button type="submit">Create</button>

      </form>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

      
  const formView = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="text"
        value={password}
        name="password"
        onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
    
  
  return (
    <div>
      <h2>blogs</h2>
      <ErrorPop message={errorMessage}/>
      <MessagePop message={message}/>
      {user === null
        ? formView()
        : blogsView()
      }
    </div>
    
  )
}

export default App