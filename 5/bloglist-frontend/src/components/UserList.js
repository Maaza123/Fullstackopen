import React from 'react';
import { useEffect } from 'react';
import userService from '../services/users';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
      },[])

    const floatLeft = {
        float:'left'
    }
    return (
        <div>
            
            <table>
                <thead>
                    <tr >
                        <th><h3 style={floatLeft}>Users</h3></th><th>blogs created</th>
                    </tr> 
                </thead>
                <tbody>
                    {users.map(user =>
                    
                        <tr key={user.id}>
                            <td ><Link to={`/users/${user.id}`}>{user.name}</Link></td><th>{user.blogs.length}</th>
                        </tr>
                    )}
                </tbody>            
            </table>
        </div>
    )
}
export default UserList;