const initialState = {
    notification: '',
    id: 0
};

const notificationReducer = (state=initialState, action ) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data;
        case 'ZERO':
            if(action.data.id === state.id){
                return initialState;
            }
    }
    return state;
}

let nextId = 0;
export const setNewNotification = (notification, time) => {
    return async dispatch => {
        const id = nextId++;
        console.log(nextId);
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {notification,id}
        }); 
        setTimeout(() => dispatch({
            type: 'ZERO',
            data: {notification, id}
        }), time);
    }
    
}
export default notificationReducer;