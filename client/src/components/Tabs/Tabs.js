import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Tab, Tabs, Badge, Paper } from '@material-ui/core'

import './Tabs.css'
import Suggestions from '../Suggestions'
import Drawer from '../TemporaryDrawer'

const tabs = ['Suggestions', 'Matches', 'Groups', 'Qualities', 'Profile', 'Settings']
const tabContainers = [Suggestions, Suggestions, Suggestions, Suggestions, Suggestions, Suggestions]

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * 2
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`
	},
	root: {
		flexGrow: 1
	}
})

class CenteredTabs extends React.Component {
	state = {
		value: 0,
		notifications: Array(tabs.length).fill(0)
	}

	handleChange = (event, value) => {
		this.setState({ value });
	}

	render() {
		const { classes } = this.props
		const { notifications, value } = this.state

		return (
			<div>
				<Paper className={classes.root}>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor='primary'
						textColor='primary'
						centered
					>
						{tabs.map((tabName, index) => (
							<Tab
								label={
									notifications[index]
									? <Badge
										badgeContent={notifications[index]}
										color='secondary'
										className={classes.padding}
									>
										{tabName}
									</Badge>
									: tabName
								}
								key={index}
							/>
						))}
					</Tabs>
				</Paper>
				{tabContainers.map((Container, index) => (
					value === index && (<div key={index}><Container
						name={tabs[index]}
						onButtonClick={() => this.setState({ notifications: notifications.map((val, i) => i === index ? val + 1 : val) })}
					/>
					<Drawer /></div>)
				))}
			</div>
		)
	}
}

export default withStyles(styles)(CenteredTabs)