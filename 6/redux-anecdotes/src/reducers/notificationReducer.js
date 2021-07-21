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
const setNotification =(notification, id)=> {
    return({
        type: 'SET_NOTIFICATION',
        data: {notification,id}
    })
}
const zero = (id) => {
    return ({
        type: 'ZERO',
        data:{id}        
    })
}
export const setNewNotification = (dispatch, notification) => {
    const id = nextId++;
    console.log(nextId);
    dispatch(setNotification(notification, id));
    setTimeout(() => dispatch(zero(id)), 5000);
}
export default notificationReducer;