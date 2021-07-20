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

export default { registerUser };