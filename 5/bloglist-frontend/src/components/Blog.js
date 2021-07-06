import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
const handleButtonClick = async (blog, modifyLikes) => {
  try{
    const response = await blogService.addLike(blog);
    modifyLikes(response);
  }catch(error){
    console.log(error);
  }
}
const deleteBlog = async(blog, removeBlog) =>{
  try{
    const response = await blogService.deleteBlog(blog.id);
    console.log(response);
    if(response.status === 204){
       await removeBlog(blog);
    } 
  }catch(error){
    return error;
  }
  

}
const Blog = ({ props, blog, modifyLikes, removeBlog }) => (
  <div>
    {blog.title}
    <Togglable buttonLabel='show more'>
      <ul>
        <li>{blog.url}</li>

        <li>likes {blog.likes} <button  onClick={() => handleButtonClick(blog, modifyLikes)}>like</button></li>
        <li>{blog.author}</li>
      </ul>
      <button onClick={() => deleteBlog(blog, removeBlog)}>Delete blogs</button>

      
      
        
      
    </Togglable>
  </div>
)

export default Blog
