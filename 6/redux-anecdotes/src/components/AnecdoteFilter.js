import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const AnecdoteFilter = ()=> {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);

    const handleChange = (event) => {
        const filter = event.target.value.toLowerCase();
        dispatch(setFilter(filter));
    }

    return(
        <div>
            Filter:
            <input name='filter' value={filter} onChange={handleChange}/>
        </div>
        
    )

}

export default AnecdoteFilter;