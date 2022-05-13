import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHAY } from '../queries/authorService'
import Select from 'react-select'


const SetBirthYear = ({authors}) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [year, setYear] = useState('')

    const options = authors.map(a => {
        return ({value: a.name, label: a.name})
    })
    const[setBirthday] = useMutation(SET_BIRTHAY, {
        refetchQueries: [{query: ALL_AUTHORS}]
    })
    const handleSubmit= (event) => {
        event.preventDefault();
        const setBornTo = parseInt(year);
        setBirthday({ variables: {name: selectedOption.value, setBornTo} })
        setYear('')
    }
    return(
        <div>
            <h2>
                Set Birthyear
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                name:
                <Select
                defaultValue={selectedOption}
                options={options}
                onChange={setSelectedOption}/>
                </div>
                <div>
                year:
                <input
                type='number'
                name='year'
                value={year}
                onChange={({target}) => setYear(target.value)}
                />
                </div>
                <button type='submit'>submit</button>
                

            </form>
        </div>
    )
}

export default SetBirthYear