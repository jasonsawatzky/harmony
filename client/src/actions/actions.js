import { initialTodoId } from '../reducers/todos'

let nextTodoId = initialTodoId

export const Actions = {
	ADD_TODO: 'ADD_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	SET_FILTER: 'SET_FILTER'
}

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const addTodo = text => ({
	type: Actions.ADD_TODO,
	id: nextTodoId++,
	text
})

export const toggleTodo = id => ({
	type: Actions.TOGGLE_TODO,
	id
})

export const setFilter = filter => ({
	type: Actions.SET_FILTER,
	filter
})