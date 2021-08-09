import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;

};
const addLike = async (blog) => {
  try{
    console.log(blog);
    const url = `${baseUrl}/${blog.id}`;
    console.log('url: ',  url);
    blog.likes = blog.likes + 1;
    const response = await axios.put(url, blog);
    console.log('service:',response);
    return response.data;
  }catch(error){
    return error;
  }


};

const addComment = async(id, comment) => {
  try{
    const url = `${baseUrl}/${id}/comments`;
    console.log(comment)
    const response = await axios.post(url, {comment});
    return response.data;
  }catch(error){
    return error
  }
}

const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token }
  };
  try{
    return await axios.delete(url, config);
  }catch(error){
    return(error);
  }
};
export default { getAll, setToken, create, addLike, deleteBlog, addComment };