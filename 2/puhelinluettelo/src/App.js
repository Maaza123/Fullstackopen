import React, { useState, useEffect } from 'react'
import numberService from './services/numberService.js';

const Numbers = ({persons, handleRemovePerson}) => {
  return(
    <div>
      {persons.map((person) => 
        <p key={person.id}>
          {person.name} {person.number} <RemoveButton id={person.id} name={person.name} handleRemovePerson={handleRemovePerson} />
        </p>)}
    </div>
  )
}
const RemoveButton = ({id, handleRemovePerson, name}) => {
  return(
    <button value={id} name={name} onClick={handleRemovePerson}>delete</button>
  )
}
const Input = ({name, value, onChange}) => {
  return(
    <div>
        {name}: <input value={value} onChange={onChange}/>
  </div>
  )
}

const Notification = ({message}) => {
  if(message ===null){
    return null
  }

  return(
    <div className='message'>
      {message}
    </div>
  )
}

const ErrorPop = ({message}) => {
  if(message ===null){
    return null
  }

  return(
    <div className='error'>
      {message}
    </div>
  )
}
const Filter = ({value, onChange}) => {
  return(
    <Input name='filter' value={value} onChange={onChange} />
  )
}
const PersonForm = (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
        <Input name='name' value={props.newName} onChange={props.handleNameChange} />
        <Input name='number' value={props.newNumber} onChange={props.handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('');
  const [ filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect (() =>{
    numberService
      .getAll()
      .then(response => {
        console.log(response.data);
        setPersons(response.data)
      });
  }, [])  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newName);
    if(found !== undefined){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        numberService
          .update(found.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== found.id ? person: response.data));
            popMessage(`Changed number for person ${newPerson.name}`);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            popError(`Information of ${newPerson.name} has already been removed from the server`);
            numberService
              .getAll()
              .then(response => {
                setPersons(response.data);
              })
          })
      }
    }else{
      numberService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          popMessage(`Added new person ${newPerson.name}`);
          setNewName('');
          setNewNumber('');
        })     
    }
  }

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  }
  const popMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }
  const popError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }
  const handleRemovePerson = (event) => {
    event.preventDefault();
    const id = event.target.value;
    const name = event.target.name;
    console.log(event.target.value);
    if(window.confirm(`Delete ${event.target.name}?`)){
      console.log(id)
      numberService
        .deletePerson(id)
        .then(response => {
          console.log(`Persons: ${persons}`)
          setPersons(persons.filter(person => person.id != id));
          popMessage(`Removed person ${name}`);
      });
    }    
  }
  let filteredPersons = (() => {
    let filteredPerson= [];
    persons.forEach(person => {
      if(person.name.toLowerCase().includes(filter.toLowerCase())){
        filteredPerson.push(person);
      }
    })
    console.log(filteredPerson);
    return filteredPerson;
    
  })();
  console.log(filteredPersons);
  return (
    <div>
      <Notification message={message} />
      <ErrorPop message={errorMessage} />
      <h2>Phonebook</h2>
        <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}
        newNumber={newNumber} newName={newName}/>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} handleRemovePerson={handleRemovePerson}/>
    </div>
  )

}

export default App