import { Actions, VisibilityFilters } from '../actions';

export default (state = VisibilityFilters.SHOW_ALL, action) => {
	switch (action.type) {
		case Actions.SET_FILTER:
			return action.filter
		default:
			return state
	}
}