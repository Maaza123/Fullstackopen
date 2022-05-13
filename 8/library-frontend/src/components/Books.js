
import React from 'react'
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookService'
import { useState } from 'react'
const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const [options, setOptions] = useState([])
  const highlighted = {
    border: '2px solid rgb(0, 0, 255)'
  }
  const filteredBooks = () => {
    if(genre){
      const filteredBooks = books.filter(b => b.genres.includes(genre));
      return filteredBooks
    }
    return books
    
  }
  useEffect(() => {
    const genres = books.map(b => b.genres)
    const options = genres.filter((value, index, self) =>  {
      return self.indexOf(value) === index;
    })
    const merged = [].concat.apply([], options)
    setOptions(merged)
  }, [books])
  
  useEffect(() => {
    if(result.data){
      setBooks(result.data.allBooks)
    }
  }, [result] )

  if (!props.show) {
    return null
  }

  

  if(result.loading){
    return(<div>loading...</div>)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th style={{textAlign: 'left'}}>
              book
            </th>
            <th style={{textAlign: 'left'}}>
              author
            </th>
            <th style={{textAlign: 'left'}}>
              published
            </th>
          </tr>
          {filteredBooks().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
        
      </table>
      <div>
        <button style={!genre? highlighted: null} onClick={() => setGenre(null)}>all genres</button>
        {options.map(value => 
        <button  key={value} style={value === genre ? highlighted : null} onClick={() => setGenre(value)}>{value}</button>
        )}
          
      </div>
    </div>
  )
}

export default Books