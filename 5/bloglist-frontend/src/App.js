import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Blogs from './components/Blogs'
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Container from '@material-ui/core/Container'
import RegisterForm from './components/RegisterForm';
import Notification from './components/Notification';
import { initUser} from './reducers/userReducer';
import { initBlogs } from './reducers/blogReducer';
import {useDispatch, useSelector} from 'react-redux'
import {Switch, Route, Link, Redirect, useParams} from 'react-router-dom'
import { logout } from './reducers/userReducer';
import UserList from './components/UserList';
import UserBlogs from './components/UserBlogs';
import { AppBar, Typography, Button, Toolbar } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';




const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const padding = {
    marginRight: 10
  }
  const textDecoration ={
    textDecoration: 'none',
    color: 'white'
    
  }
  return (
    <AppBar position='static'>

      
        <Toolbar>
          <Typography style={padding} variant="h6" className={classes.title}>
            BlogApp
          </Typography>
          <Button style={padding} variant='contained' color='primary' component={Link} to='/blog'>
            Blogs
          </Button>
          <Button style={padding} variant='contained' color='primary' component={Link} to='/users'>
            users
          </Button>
          {user? <div style={{position: 'right'}}>Logged in as {user.name} <button onClick={() => dispatch(logout())}>logout</button></div> : null}
        </Toolbar>
              
              
    </AppBar>
  )
}

const App = () => {
  const user = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  
  useEffect(() => {
    blogService.getAll().then(data => {
      dispatch(initBlogs(data))
    })
  },[dispatch]);

  if(!user){
    return(
      <Container>
        <Notification/>
        <Switch>
          <Route path='/login'>
            <LoginForm/> 
          </Route>
          <Route path='/register'>
            <RegisterForm/>     
          </Route>
          <Route path='/'>
            <Redirect to='/login'/>
          </Route>  
        </Switch>      
      </Container>)
  }
  return (
      <Container>
        <Notification/>
        <Menu/>
        <br/>
        <br/>
        <Switch>
          <Route path='/users/:id'>
            <UserBlogs/>
          </Route>
          <Route path='/users'>
            <UserList/>
          </Route>  
          <Route path='/blog/:id'>
            <Blog/>
          </Route>
          <Route path='/blog'>
            <Blogs/>
          </Route>
          <Route path='/'>
            <Redirect to='/blog'/>
          </Route>
          
          
      </Switch>    
      </Container>
  );
};

export default App;