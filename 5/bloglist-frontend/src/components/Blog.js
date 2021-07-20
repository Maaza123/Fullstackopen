import React from 'react';
import Togglable from './Togglable';
import BlogService from '../services/blogs';
import PropTypes from 'prop-types';

const deleteBlog = async(blog, removeBlog) => {
  try{
    if(window.confirm(`Are you sure you want to remove blog ${blog.title}?`)){
      const response = await BlogService.deleteBlog(blog.id);
      console.log(response);
      if(response.status === 204){
        removeBlog(blog);
      }
    }
  }catch(error){
    return error;
  }


};
const Blog = ({ blog, addLikes, removeBlog }) => (
  <div className="blog">
    {blog.title}
    <Togglable class='moreInfoButton' buttonLabel="More info">
      <ul>
        <li>{blog.url}</li>

        <li>likes {blog.likes} <button className='likeButton' onClick={() => addLikes(blog) }>like</button></li>
        <li>{blog.author}</li>
      </ul>
      <button onClick={() => deleteBlog(blog, removeBlog)}>Delete blogs</button>





    </Togglable>
  </div>
);

Togglable.propTypes = {
  buttonLabel : PropTypes.string.isRequired
};
export default Blog;
