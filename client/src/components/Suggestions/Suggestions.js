import React from 'react'

import { Typography, Button } from '@material-ui/core'

export default ({ name, onButtonClick }) => (
	<div>
		<Typography component='div' style={{ padding: 8 * 3 }}>
			<h1>{name}</h1>
			<Button variant='raised' onClick={onButtonClick}>
				Add Notification
			</Button>
		</Typography>
	</div>
)