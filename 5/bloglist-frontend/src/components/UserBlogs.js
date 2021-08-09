import React from 'react';
import userService from '../services/users';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { TableBody, TableCell, TableContainer, TableRow, Paper, Table  } from '@material-ui/core';

const UserBlogs = () => {

    const [user, setUser] = useState(null);
    const id = useParams().id;
    const style = {
        paddingLeft: 50
    }
    useEffect(() => {
        userService.getAll().then(users=>{
            const found = users.find(u => u.id === id);
            setUser(found)
        });
    }, [id])

    if(!user){
        return null;
    }
    if(user.blogs.length === 0){
        return(
            <div>
                <h3>{user.name} doesn't have any blogs</h3>
            </div>
        )
    }
    return(
        <div>
        <h3>{user.name}</h3>
        <p>Created blogs:</p>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                {user.blogs.map(blog =>
                    <TableRow key={blog.id}>
                        <TableCell>
                            {blog.title}
                        </TableCell>
                    </TableRow>               
                )}
                </TableBody>
            </Table>
            
            
            
            
        </TableContainer>
        </div>    
    )
}

export default UserBlogs;