import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FILTERED_BOOKS } from '../queries/bookService'
import { useLazyQuery } from '@apollo/client'
import { ME } from '../queries/user'
import { compose } from 'async'
const Recommended = ({show}) => {
    const {data: data_me} = useQuery(ME)
    

    if(!show){
        return null
    }
    return(<div>success</div>)
}

export default Recommended