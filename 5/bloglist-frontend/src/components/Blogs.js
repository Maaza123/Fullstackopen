import React from 'react';
import { useRef } from 'react';
import { useSelector} from 'react-redux';
import Togglable from './Togglable';
import Blogform from './Blogform';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableContainer, TableRow, Paper, Table  } from '@material-ui/core';
const Blogs = () => {
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.user);

    const blogFormRef = useRef();

    if(!user){
        return null
    }
    return(
        <div>
            <Togglable  buttonLabel='Create new' ref={blogFormRef}>
                <Blogform />
            </Togglable>
            <h2>Blogs:</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs.map(blog =>
                        <TableRow key={blog.id}>
                            <TableCell>
                                <Link  to={`/blog/${blog.id}`}>{blog.title}</Link>
                            </TableCell>
                            <TableCell>
                                {blog.author}
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>                        
            </TableContainer>
            

        </div>
    )
}

export default Blogs;