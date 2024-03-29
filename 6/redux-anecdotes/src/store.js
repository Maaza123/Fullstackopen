import anectodeReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anectodeReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)   


export default store;