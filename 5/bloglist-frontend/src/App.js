import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Blogform from './components/Blogform';
import Togglable from './components/Togglable';
import BlogService from './services/blogs';
import RegisterForm from './components/RegisterForm';

import './App.css';

const ErrorPop = ({ message }) => {
  if(message ===null){
    return null;
  }

  return(
    <div className='error'>
      {message}
    </div>
  );
};

const MessagePop = ({ message }) => {
  if(message ===null){
    return null;
  }

  return(
    <div className='message'>
      {message}
    </div>
  );
};
const RenderName = ({ user, onClick }) => (
  <div>
    <h3>Logged in as {user.name}<button onClick={onClick}>logout</button></h3>
  </div>
);

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();
  const registerFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => {
        return b.likes - a.likes ;
      });
      setBlogs( blogs );

    }


    );
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if(userJson){
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };
  const removeBlog = async(blog) => {
    const newBlogs = [...blogs];
    const indexToRemove = newBlogs.findIndex((item) => {
      return item.id === blog.id;
    });
    newBlogs.splice(indexToRemove,1);
    console.log(indexToRemove);
    newBlogs.sort((a,b) => {
      return b.likes - a.likes;
    });
    setBlogs(newBlogs);

  };
  const addBlog = async (blog) => {
    try{
      const response = await blogService.create(blog);
      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
    }catch(error){
      const stringified = JSON.stringify(error.response.data);
      handleErrorPop(stringified);
    }

  };
  const addLikes = async(blog) => {
    try{
      await BlogService.addLike(blog);
      console.log('blog.id: ', blog.id);
      const blogToChange = blogs.find(b => b.id === blog.id);
      const changedBlog = { ...blogToChange, likes: blog.likes };
      const newBlogs = blogs.map((b => b.id !== blog.id ? b : changedBlog));
      newBlogs.sort((a,b) => {
        return b.likes - a.likes ;
      });
      setBlogs(newBlogs);
    }catch(error){
      console.log(error);
    }

  };
  const handleErrorPop = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  const handleMessagePop = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      handleMessagePop(`Welcome ${user.name}`);
    } catch(error) {
      const stringified = JSON.stringify(error.response.data);
      handleErrorPop(stringified);
      setUser(user);
      setUsername('');
      setPassword('');
    }
  };
  const blogsView = () => (
    <div>
      <RenderName user={user} onClick={handleLogout}/>
      <br/>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} addLikes={addLikes} blog={blog} removeBlog={removeBlog}/>
      )}
      <Togglable  buttonLabel='Add new' ref={blogFormRef}>
        <Blogform addBlog={addBlog}/>
      </Togglable>

    </div>
  );


  const formView = () => (
    <div>
      <form onSubmit={handleLogin} id='loginForm'>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginButton">login</button>
      </form>
      <Togglable buttonLabel='Register' ref={registerFormRef}>
        <RegisterForm handleErrorPop={handleErrorPop}/>
      </Togglable>
    </div>

  );


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

  );
};

export default App;