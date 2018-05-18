import React from 'react'
import './Todo.css'
import PropTypes from 'prop-types'

const Todo = ({ text, onClick, completed, isEven }) => (
	<div
		className='todoItem'
		onClick={onClick}
		style={{
			backgroundColor: isEven ? 'white' : 'lightGray',
			WebkitUserSelect: 'none'
		}}
	>
		<span
			className='todoText'
			style={{textDecoration: completed ? 'line-through' : 'none'}}
		>{text}</span>
	</div>
)

Todo.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	isEven: PropTypes.bool.isRequired
}

export default Todo