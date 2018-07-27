import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Avatar, Tooltip, Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
	chatBubbleRight: {
		backgroundColor: theme.palette.secondary.main,
		borderRadius: '20px',
		padding: `${theme.spacing.unit}px`
	},
	chatBubbleLeft: {
		backgroundColor: theme.palette.primary.main,
		borderRadius: '20px',
		padding: `${theme.spacing.unit}px`
	},
	chatPointerRight: {
		height: 0,
		width: 0,
		borderLeft: '30px solid ' + theme.palette.secondary.main,
		borderRight: '10px solid transparent',
		borderBottom: '3px solid transparent',
		borderTop: '10px solid transparent',
		transform: 'translate(0, 10px)',
		zIndex: -1
	},
	chatPointerLeft: {
		height: 0,
		width: 0,
		borderRight: '30px solid ' + theme.palette.primary.main,
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
	avatarWrapper: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		cursor: 'pointer'
	},
	container: {
		margin: '8px',
		marginBottom: '40px'
	},
	avatarButton: {
		padding: 0,
		borderRadius: '50%',
		width: '40px'
	},
	alignRight: {
		textAlign: 'right',
		paddingRight: '100px'
	},
	alignLeft: {
		paddingLeft: '100px'
	}
})

const chatText = 'this is some text this is sthis is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text ome tthis is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text ext this is somethis is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text this is some text  text this is some text this is some text this is some text this is some text this is some text this is some text this is some text'

const ChatMessageRight = (classes, direction, avatar) =>
	<div className={classes.container}>
		<Typography className={classes.alignRight}>Their Group, June 4, 2017, 9:54 PM</Typography>
		<div className={classes[direction + 'Flex']}>
			<div className={classes.chatBubbleRight}>
				<Typography>{chatText}</Typography>
			</div>
			<div className={classes.chatPointerRight} />
			<Tooltip title='View Profile'>
				<Link className={classes.avatarWrapper} to='/landing'>
					<Avatar src={avatar} />
				</Link>
			</Tooltip>
		</div>
	</div>

class ChatMessageLeft extends React.Component {
	state = {
		open: false
	}

	render() {
		const { classes, direction, avatar } = this.props
		return (
			<div className={classes.container}>
				<Typography className={classes.alignLeft}>Our Group, June 4, 2017, 9:54 PM</Typography>
				<div className={classes[direction + 'Flex']}>
					<Tooltip title='View Profile'>
						<div className={classes.avatarWrapper} onClick={() => this.setState({ open: true })}>
							<Avatar src={avatar}/>
						</div>
					</Tooltip>
					<div className={classes.chatPointerLeft} />
					<div className={classes.chatBubbleLeft}>
						<Typography>{chatText}</Typography>
					</div>
				</div>
				<Modal open={this.state.open} onClose={() => this.setState({ open: false })}>
					<Typography>Hello world</Typography>
				</Modal>
			</div>
		)
	}
}

const ChatMessage = ({ classes, direction, avatar }) =>
	direction === 'right'
		? ChatMessageRight(classes, direction, avatar)
		: <ChatMessageLeft classes={classes} direction={direction} avatar={avatar} />


ChatMessage.propTypes = {
	classes: PropTypes.object,
	direction: PropTypes.oneOf(['left', 'right']).isRequired,
	avatar: PropTypes.string.isRequired
}

export default withStyles(styles)(ChatMessage)