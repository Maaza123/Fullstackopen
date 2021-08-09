import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNewNotification } from './notificationReducer';

const initialState = null;

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        case 'INIT':
            return action.data
    }
    return state
}

export const initUser = ()=>{
    return async dispatch => {
        const userJson = window.localStorage.getItem('user');
        console.log(userJson)
        if(userJson){
            const user = JSON.parse(userJson);
            blogService.setToken(user.token);
            dispatch({
                type: 'INIT',
                data: user
            })
    }
    }
}

export const logout = () => {
    window.localStorage.clear('user');
    return({
        type: 'LOGOUT'
    })
}

export const login = (credentials) =>{
    return async dispatch => {
        try{
            const user = await loginService.login(credentials);
            window.localStorage.setItem(
              'user', JSON.stringify(user)
            );
            await blogService.setToken(user.token);

            dispatch({
                type: 'LOGIN',
                data: user
            })
            dispatch(setNewNotification(`Welcome ${user.name}`,5000, 'message'));
        }catch(error){
            dispatch(setNewNotification(`${error.response.data.error}`, 5000, 'error'))
            
        }
    }
}

export default userReducer;