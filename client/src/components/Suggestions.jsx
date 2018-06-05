import React from 'react'
import { Typography, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const Suggestions = ({ onButtonClick }) =>
	<div>
		<Typography component='div' style={{ padding: 24 }}>
			<h1>Suggestions</h1>
			<Button variant='raised' onClick={onButtonClick}>
				Add Notification
			</Button>
		</Typography>
	</div>

Suggestions.propTypes = {
	name: PropTypes.string,
	onButtonClick: PropTypes.func
}

export default Suggestions