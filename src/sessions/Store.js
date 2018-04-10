import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/UserReducer';

const reducers = combineReducers({
    user: userReducer
});

export const store = createStore(reducers);

console.log(store.getState());