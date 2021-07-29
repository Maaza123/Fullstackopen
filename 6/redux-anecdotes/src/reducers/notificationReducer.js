const initialState = {
    notification: ''
};

const notificationReducer = (state=initialState, action ) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data;
        case 'ZERO':
            return initialState;
    }
    return state;
}

let id = 0;
export const setNewNotification = (notification, time) => {
    return async dispatch => {
        clearTimeout(id)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {notification}
        }); 
        id = setTimeout(() => dispatch({
            type: 'ZERO'
        }), time);
    }
    
}
export default notificationReducer;