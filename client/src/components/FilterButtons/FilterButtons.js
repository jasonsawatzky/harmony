import React from 'react'
import '../Todo/Todo.css'
import './FilterButtons.css'
import { VisibilityFilters } from '../../actions'
import PropTypes from 'prop-types'

const FilterButtons = ({ onClick, filter }) => (
	<div className='todoItem'>
		<div
			className={'filterButton' + (filter === VisibilityFilters.SHOW_ALL ? ' active' : '')}
			id={VisibilityFilters.SHOW_ALL}
			onClick={() => onClick(VisibilityFilters.SHOW_ALL)}
		>All</div>
		<div
			className={'filterButton' + (filter === VisibilityFilters.SHOW_COMPLETED ? ' active' : '')}
			id={VisibilityFilters.SHOW_COMPLETED}
			onClick={() => onClick(VisibilityFilters.SHOW_COMPLETED)}
		>Completed</div>
		<div
			className={'filterButton' + (filter === VisibilityFilters.SHOW_ACTIVE ? ' active' : '')}
			id={VisibilityFilters.SHOW_ACTIVE}
			onClick={() => onClick(VisibilityFilters.SHOW_ACTIVE)}
		>Active</div>
	</div>
)

FilterButtons.propTypes = {
	onClick: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired
}

export default FilterButtons
