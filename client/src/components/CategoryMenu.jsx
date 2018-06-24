import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import {
	Tab,
	Tabs,
	Badge,
	Paper,
	BottomNavigation,
	BottomNavigationAction
} from '@material-ui/core'

import {
	ChatBubble as ChatBubbleIcon,
	Settings,
	Person,
	Group,
	ThumbsUpDown,
	GroupAdd
} from '@material-ui/icons'

import Suggestions from './Suggestions'
import Matches from './Matches'
import Drawer from './Drawer'
import ConditionalRender from './ConditionalRender'

const navIcons = [
	GroupAdd, ChatBubbleIcon, Group, ThumbsUpDown, Person, Settings
]

const tabNames = [
	'Suggestions',
	'Matches',
	'Groups',
	'Qualities',
	'Profile',
	'Settings'
]

const tabs = [
	Suggestions,
	Matches,
	Suggestions,
	Suggestions,
	Suggestions,
	Suggestions
]

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * 2
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`
	},
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
		zIndex: 100
	},
	bottomNavButton: {
		minWidth: '30px',
		padding: '0',
		font: '400 10px system-ui',
		backgroundColor: 'lightGray',
		color: theme.palette.secondary.main
	}
})

class CategoryMenu extends React.Component {

	static propTypes = {
		classes: PropTypes.object
	}

	state = {
		value: 0,
		notifications: Array(tabs.length).fill(0)
	}

	BottomNavigation = classes =>
		<Paper className={classes.bottomNav}>
			<BottomNavigation
				value={this.state.value}
				onChange={(event, value) => this.setState({ value })}
			>
				{navIcons.map((Icon, index) =>
					<BottomNavigationAction
						label={tabNames[index] === 'Suggestions'
							? 'Suggest'
							: tabNames[index]
						}
						value={index}
						icon={<Icon />}
						key={tabNames[index]}
						className={classes.bottomNavButton}
					/>
				)}
			</BottomNavigation>
		</Paper>

	CenteredTabs = classes =>
		<Paper>
			<Tabs
				value={this.state.value}
				onChange={(event, value) => this.setState({ value })}
				indicatorColor='secondary'
				textColor='secondary'
				centered
			>
				{tabNames.map((tabName, index) =>
					<Tab
						label={
							this.state.notifications[index]
							? <Badge
								badgeContent={this.state.notifications[index]}
								color='primary'
								className={classes.padding}
							>
								{tabName}
							</Badge>
							: tabName
						}
						key={index}
					/>
				)}
			</Tabs>
		</Paper>

	render() {
		const { classes } = this.props
		const { notifications, value } = this.state
		const Page = tabs[value]

		return (
			<Fragment>
				<ConditionalRender
					threshold={540}
					AboveComponent={this.CenteredTabs(classes)}
					BelowComponent={this.BottomNavigation(classes)}
				/>
				{/* {Array(tabs.length).fill().map((_, index) =>
					value === index &&
						<div key={index}>
							<Suggestions
								name={tabNames[index]}
								onButtonClick={() => this.setState({
									notifications: notifications.map((val, i) =>
										i === index ? val + 1 : val)
								})}
							/>
							<Drawer />
						</div>
				)} */}
				<Page onButtonClick={() => this.setState({
					notifications: notifications.map((val, i) =>
						i === 0 ? val + 1 : val)
				})}/>
				<Drawer />
			</Fragment>
		)
	}
}

export default withStyles(styles)(CategoryMenu)