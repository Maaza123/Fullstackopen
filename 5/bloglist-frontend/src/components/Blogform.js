import React, { useState } from 'react';
import { addBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
const Blogform = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addBlog({
      'title':title,
      'author': author,
      'url': url }))
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return(<form onSubmit={handleSubmit} id="form">
    <div>
          Title:
      <input
        type="text"
        id="title"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
          Author:
      <input
        type="text"
        id="author"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
          Url:
      <input
        type="text"
        id="url"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>

    <button type="submit" id="submit">Create</button>

  </form>);
};

export default Blogform;