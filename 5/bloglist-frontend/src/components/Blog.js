import React from 'react';
import Togglable from './Togglable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBlog, like } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { addComment } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';
import { Box,  Typography } from '@material-ui/core';
import {ExternalLink} from 'react-external-link'

const Blog = () => {
  const id = useParams().id;
  const history = useHistory();
  const blog = useSelector(state => {
    return state.blogs.find(b => b.id === id)
  })
  
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment('')

  }
  const padding = {
    paddingTop: 8
  }
  const handleDelete = async(blog) => {
  if(window.confirm(`Are you sure you want to remove blog ${blog.title}?`)){
    dispatch(deleteBlog(blog.id))
    history.push('/')
  };
  }
  if(!blog){
    return null;
  }
  return(
  <div className="blog" >
    <h1>{blog.title}</h1>
    <Box color='text.primary'>
      <Typography><ExternalLink href={`https://${blog.url}`}>{blog.url}</ExternalLink></Typography>
      <Typography>likes {blog.likes} <button className='likeButton' onClick={() => dispatch(like(blog))} >like</button></Typography>
      <Typography>{blog.author}</Typography>
    </Box>  
    <div style={padding}>
      <button onClick={() => handleDelete(blog)}>Delete blog</button>
    </div>
    <div>
      <h3 style={{marginBottom: 8}}>Add comment:</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          id='comment' 
          name='comment' 
          value={comment} 
          onChange={({ target }) => setComment(target.value)}/>
          <button type='submit' id='submit'>send</button>
      </form>
    </div>
    <div>
      <h3 style={{marginBottom: -10}}>Comments:</h3>
      <ul style={{marginLeft:-23}}>
        {blog.comments.map((comment, key) => {
          return(<li style={{marginTop: 5}} key={key}>{comment}</li>)
        })}
      </ul>
    </div>  
    
    
  </div>
  )
}
  
  
;

Togglable.propTypes = {
  buttonLabel : PropTypes.string.isRequired
};
export default Blog;
