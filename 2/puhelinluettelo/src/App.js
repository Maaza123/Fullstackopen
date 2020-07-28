import React, { useState } from 'react'

const Numbers = ({persons}) => {
  return(
    <div>
      {persons.map((person) => 
        <p key={person.name}>
          {person.name} {person.number}
        </p>)}
    </div>
  )
}
const Input = ({name, value, onChange}) => {
  return(
    <div>
        {name}: <input value={value} onChange={onChange}/>
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
const Persons = () => {

}
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '' 
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const included = (() => {
      let bool = false;
      persons.forEach(person => {
        console.log(person.name);
        if(person.name === newName){
          bool = true;
        }
      });
      return bool;
    })();
    if(included){
      alert(`${newName} is already added to the phonebook`);
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
      <h2>Phonebook</h2>
        <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}
        newNumber={newNumber} newName={newName}/>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </div>
  )

}

export default App