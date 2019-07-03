import { combineReducers } from 'redux';
import headerReducer from './header';

export default combineReducers({
    header: headerReducer
})