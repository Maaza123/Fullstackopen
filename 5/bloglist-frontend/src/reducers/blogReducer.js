import blogService from '../services/blogs';
import { setNewNotification } from './notificationReducer';

const initialState = [];

const sortBlogs = (blogs) => {
    blogs.sort((a,b) => {
        return b.likes - a.likes ;
      });
    return blogs;
}
const blogReducer = (state=initialState, action)=> {
    switch(action.type){
        case 'ADD_BLOG':
            return state.concat(action.data);
            
        case 'INIT_BLOGS':
            const sortedBlogs = sortBlogs(action.data);
            return sortedBlogs;
        case 'LIKE':
            const newBlogs = [...state].map((b => b.id !== action.data.id ? b : action.data));
            return sortBlogs(newBlogs);
        case 'DELETE_BLOG':  
            return state.filter((b) => b.id !== action.data);
        case 'ADD_COMMENT':
            return [...state].map((b => b.id !== action.data.id ? b : action.data));
    }
    return state;
}

export const addBlog = (newBlog) => {
    return async dispatch => {
        const response = await blogService.create(newBlog);
        
        dispatch({
            type: 'ADD_BLOG',
            data: response
        })

    }
}

export const initBlogs = (blogs) => {
            return({
            type: 'INIT_BLOGS',
            data: blogs
        })
}

export const like = (blog) => {
    return async dispatch => {
        const response = await blogService.addLike(blog);
        dispatch({
            type: 'LIKE',
            data: response
        })
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        try{
            const response = await blogService.addComment(id, comment);
            dispatch({
                type: 'ADD_COMMENT',
                data: response
            })
        }catch(error){
            dispatch(setNewNotification(`${error}`, 5000, error));
        }
        
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        const response = await blogService.deleteBlog(id);
        console.log('delete:', response);
        if(response.status === 204){
            dispatch({
                type: 'DELETE_BLOG',
                data: id
            })
        }
        
    }
}

export default blogReducer;