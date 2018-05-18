import todos from './todos'
import filter from './filter'
import { combineReducers } from 'redux';

export default combineReducers({
	todos,
	filter
})