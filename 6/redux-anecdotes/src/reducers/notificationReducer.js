const initialState = '';

const notificationReducer = (state=initialState, action ) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data.notification;
        case 'ZERO':
            return '';
    }
    return state;
}

export const setNotification =(notification)=> {
    return({
        type: 'SET_NOTIFICATION',
        data: {notification}
    })
}
export const zero = () => {
    return ({
        type: 'ZERO'        
    })
}

export default notificationReducer;