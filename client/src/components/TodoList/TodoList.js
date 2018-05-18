import React from 'react'
import Todo from '../Todo'
import PropTypes from 'prop-types'
import AddTodo from '../../containers/AddTodo'
import SetFilter from '../../containers/SetFilter'
import './TodoList.css'

const TodoList = ({ todos, toggleTodo }) => (
	<div className='todoList'>
		<SetFilter />
		<AddTodo />
		{todos.map((todo, i) => (
			<Todo
				key={todo.id}
				text={todo.text}
				onClick={() => toggleTodo(todo.id)}
				completed={todo.completed}
				isEven={i % 2 === 0}
			/>
		))}
	</div>
)

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	toggleTodo: PropTypes.func.isRequired
}

export default TodoList