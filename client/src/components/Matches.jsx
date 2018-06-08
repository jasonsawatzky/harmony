import React from 'react'
import { Typography } from '@material-ui/core'
import ChatMessage from './ChatMessage'

const Matches = () =>
	<div>
		<Typography component='div'>
			<ChatMessage avatar='avatar.jpg' direction='right' />
		</Typography>
		<Typography component='div'>
			<ChatMessage avatar='avatar.jpg' direction='left' />
		</Typography>
	</div>

export default Matches