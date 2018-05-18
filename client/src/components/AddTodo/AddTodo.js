import React from 'react'
import './AddTodo.css'
import PropTypes from 'prop-types'

const onKeyPress = (event, onAdd) => {
	if (event.key === 'Enter') {
		onAdd(event.target.value)
		event.target.value = ''
	}
}

const AddTodo = ({ onAdd }) => (
	<div className='todoItem'>
		<input type='text' placeholder='New todo...' onKeyPress={event => onKeyPress(event, onAdd)} />
		<div className='addTodo'></div>
	</div>
)

AddTodo.propTypes = {
	onAdd: PropTypes.func.isRequired
}

export default AddTodo