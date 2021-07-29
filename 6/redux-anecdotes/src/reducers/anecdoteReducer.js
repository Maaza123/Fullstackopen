import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const sortAnecdotes = (anectodes)=> {
  const stateToSort = [...anectodes];
  stateToSort.sort((a,b) => {
    return b.votes - a.votes ;
  });
  return stateToSort;
}
const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':

      console.log('anecdote data:', action.data);
      const unsorted = state.map(anectode => 
        anectode.id !== action.data.id ? anectode : action.data
      )
      
      
      
      return sortAnecdotes([...unsorted]);

    case 'NEW_ANECDOTE':
      const newAnectode = action.data;
      return state.concat(newAnectode);

    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data);

  }
  console.log('state now: ', state)
  console.log('action', action)

  return state
}

export const like = (anecdote) =>{
  return async dispatch => {
    const id = anecdote.id
    console.log('liked');
      const changedAnectode = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      const response = await anecdoteService.put(id, changedAnectode);
      dispatch({
        type: 'LIKE',
        data: response
      }) 

  
  }
  
  
}
export const newAnectode = (content) => {

  return async dispatch => {
    const anecdote = {
      content: content,
      id: getId(),
      votes: 0
    }
    const response = await anecdoteService.addAnectode(anecdote)
    console.log('testi:', response)
    dispatch({
      type:'NEW_ANECDOTE',
      data: response
      
    })  
}}

export const initAnecdotes = () => {
  return async dispatch => {
    
    const anecdotes = await anecdoteService.getAll();
    console.log('anecdotes::', anecdotes);
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })  
  }
}

export default anecdoteReducer;