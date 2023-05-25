import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import userReducer from './user-reducer';
import thunk from 'redux-thunk';
import flightsReducer from './flights-reducer';

let reducers = combineReducers({
	user: userReducer,
	flights: flightsReducer,
});

let store = legacy_createStore(reducers, applyMiddleware(thunk));

export default store;
window.store = store;
