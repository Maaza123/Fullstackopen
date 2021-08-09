const initialState = '';

const notificationReducer = (state=initialState, action ) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data;
        case 'ZERO':
            return '';
    }
    return state;
}

let id = 0;
export const setNewNotification = (content, time, type) => {
    return async dispatch => {
        clearTimeout(id)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {content, type}
        }); 
        id = setTimeout(() => dispatch({
            type: 'ZERO'
        }), time);
    }
    
}
export default notificationReducer;