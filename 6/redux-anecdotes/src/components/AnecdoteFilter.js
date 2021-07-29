import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const AnecdoteFilter = (props)=> {
    const filter = props.filter;

    const handleChange = (event) => {
        const filter = event.target.value.toLowerCase();
        props.setFilter(filter);
    }

    return(
        <div>
            Filter:
            <input name='filter' value={filter} onChange={handleChange}/>
        </div>
        
    )

}

const mapStateToProps = (state) => {
    return{
        filter: state.filter
    }
}

const mapDispatchToProps= {
    setFilter,
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteFilter);