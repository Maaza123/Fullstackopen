import axios from 'axios';

const baseurl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseurl);
    return response.data;

}

const addAnectode = async (anecdote) => {
    const response = await axios.post(baseurl, anecdote);
    return response.data;
}

const put = async (id, anecdote) => {

    const response = await axios.put(`${baseurl}/${id}`, anecdote )

    return response.data;
}

export default {getAll, addAnectode, put};