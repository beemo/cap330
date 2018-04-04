import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import galsReducer from './reducers/gals'
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducer as burgerMenu} from 'redux-burger-menu';


const reducer = combineReducers({
  galleries: galsReducer,
  burgerMenu
})
const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
));

export default store;
