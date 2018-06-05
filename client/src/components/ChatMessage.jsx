import React from 'react'
import { Typography, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
	chatBubbleRight: {
		backgroundColor: theme.palette.secondary.light,
		borderRadius: '20px',
		padding: '8px',
		color: theme.palette.secondary.contrastText
	},
	chatBubbleLeft: {
		backgroundColor: theme.palette.secondary.dark,
		borderRadius: '20px',
		padding: '8px',
		color: theme.palette.secondary.contrastText
	},
	chatPointerRight: {
		height: 0,
		width: 0,
		borderLeft: '30px solid ' + theme.palette.secondary.light,
		borderRight: '10px solid transparent',
		borderBottom: '3px solid transparent',
		borderTop: '10px solid transparent',
		transform: 'translate(0, 10px)',
		zIndex: -1
	},
	chatPointerLeft: {
		height: 0,
		width: 0,
		borderRight: '30px solid ' + theme.palette.secondary.dark,
		borderLeft: '10px solid transparent',
		borderBottom: '3px solid transparent',
		borderTop: '10px solid transparent',
		transform: 'translate(0, 10px)',
		zIndex: -1
	},
	rightFlex: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	leftFlex: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	centerContent: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
	container: {
		margin: '8px',
		marginBottom: '40px'
	}
})

const chatText = 'this is some text this is sthis is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text ome tthis is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text ext this is somethis is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text  text this is some text this is some text this is some text this is some text this is some text this is some text this is some text'

const ChatMessageRight = (classes, direction, avatar) =>
	<div className={classes.container}>
		<Typography>Their Group, June 4, 2017, 9:54 PM</Typography>
		<div className={classes[direction + 'Flex']}>
			<div className={classes.chatBubbleRight}>
				<Typography>{chatText}</Typography>
			</div>
			<div className={classes.chatPointerRight} />
			<div className={classes.centerContent}>
				<Avatar src={avatar} />
			</div>
		</div>
	</div>

const ChatMessageLeft = (classes, direction, avatar) =>
	<div className={classes.container}>
		<Typography>Our Group, June 4, 2017, 9:54 PM</Typography>
		<div className={classes[direction + 'Flex']}>
			<div className={classes.centerContent}>
				<Avatar src={avatar} />
			</div>
			<div className={classes.chatPointerLeft} />
			<div className={classes.chatBubbleLeft}>
				<Typography>{chatText}</Typography>
			</div>
		</div>
	</div>

const ChatMessage = ({ classes, direction, avatar }) =>
	direction === 'right'
		? ChatMessageRight(classes, direction, avatar)
		: ChatMessageLeft(classes, direction, avatar)


ChatMessage.propTypes = {
	classes: PropTypes.object,
	direction: PropTypes.oneOf(['left', 'right']).isRequired,
	avatar: PropTypes.string.isRequired
}

export default withStyles(styles)(ChatMessage)