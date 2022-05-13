import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/authorService'
import { useState } from 'react'
import SetBirthYear from './SetBirthYear'


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    if(result.data){
      setAuthors(result.data.allAuthors)
  }
  }, [result])
  if (!props.show) {
    return null
  }
  if(result.loading){
    return(<div>loading...</div>)
  }
  
  
  
  console.log(authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token?<SetBirthYear authors={authors}/>:null}
      

    </div>
  )
}

export default Authors