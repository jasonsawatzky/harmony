import React from 'react'
import { Drawer, List, Divider, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
}

class TemporaryDrawer extends React.Component {
	state = {
		top: false,
		left: false,
		bottom: false,
		right: false
	}

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		})
	}

	render() {
		const { classes } = this.props
		const sideList = (
			<div className={classes.list}>
				<List>{[1]}</List>
				<Divider />
				<List>{[2]}</List>
			</div>
		)


		return (
			<div>
				<Button variant='raised' color='primary' onClick={this.toggleDrawer('left', true)}>
					Open Filters
				</Button>
				<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}
					>
						{sideList}
					</div>
				</Drawer>
			</div>
		)
	}
}

export default withStyles(styles)(TemporaryDrawer)