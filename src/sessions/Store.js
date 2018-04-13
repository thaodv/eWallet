import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { userReducer } from './reducers/UserReducer';

const reducers = combineReducers({
    user: userReducer
});
const middleware = compose( applyMiddleware(thunk, logger), window.devToolsExtension && window.devToolsExtension());

export const store = createStore(reducers,middleware);

console.log(store.getState());