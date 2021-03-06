import { Actions } from '../actions';

const initialTodos = [
	{ id: 0, text: 'do the dishes', completed: false },
	{ id: 1, text: 'take out the trash', completed: true },
	{ id: 3, text: 'mow the lawn', completed: false }
]

export const initialTodoId = initialTodos.reduce((x, y) => (
	x.id > y.id ? x.id : y.id
)) + 1

export default (todos = initialTodos, action) => {
	switch (action.type) {
		case Actions.ADD_TODO:
			return [
				...todos,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		case Actions.TOGGLE_TODO:
			return todos.map(todo =>
				todo.id === action.id
					? { ...todo, completed: !todo.completed }
					: todo
			)
		default:
			return todos
	}
}