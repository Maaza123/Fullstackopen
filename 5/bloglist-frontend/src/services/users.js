import axios from 'axios';
const url = '/api/users';

const registerUser = async ({ username, name, password }) => {
  const data = {
    username : username,
    name : name,
    password : password
  };
  return await axios.post(url, data);


};

const getAll = async () => {
  try{
    const response = await axios.get(url);
    return response.data;
  }catch(error){
    console.log(`${error}`)
  }
  
}

const getById = async (id) => {
  const response = await axios.get(`${url}/${id}`);
  console.log('found user:', response.data)
  return response.data;
}



export default { registerUser, getAll, getById };