import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk'
import {authReducer} from './reducers/auth-reducer'
import {messageReducer} from "./reducers/message-reducer";

const rootReducer = combineReducers({
   auth: authReducer,
   message: messageReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type StateType = ReturnType<typeof rootReducer>
export {
   store
}