import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blogform = ({addBlog, handleErrorPop}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const createBlog = async (event) => {
      event.preventDefault();
      try{
        const response = await blogService.create({
          title, author, url  
        })
        setTitle('');
        setAuthor('');
        setUrl('');
        addBlog(response);

      }catch(error){
        const stringified = JSON.stringify(error.response.data);
        handleErrorPop(stringified);
      }
      
      
    }
    return(<form onSubmit={createBlog}>
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

      </form>)
}

export default Blogform