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

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LIKE':
      const id = action.data.id;
      const anectodeToChange = state.find(n => n.id === id);
      const changedAnectode = {
        ...anectodeToChange,
        votes: anectodeToChange.votes+1
      }
      console.log(changedAnectode);
      const anectodes = [...state];
      const anectodesToSort = anectodes.map(anectode => 
        anectode.id !== id ? anectode : changedAnectode
      )
      const sortedAnecdotes = sortAnecdotes(anectodesToSort);
      return sortedAnecdotes;

    case 'NEW_NOTE':
      const newAnectode = action.data;
      return state.concat(newAnectode);

  }
  console.log('state now: ', state)
  console.log('action', action)

  return state
}

export const like = (id) =>{
  console.log('liked');
  return{
    type: 'LIKE',
    data:{id}
  }
  
}
export const newAnectode = (anecdote) => {
  return{
    type:'NEW_NOTE',
    data:{
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer;