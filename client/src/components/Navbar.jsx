import React from 'react'
import { Link } from 'react-router-dom'
import { Menu as MenuIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button
} from '@material-ui/core'

import * as pages from '../constants/pages'
import ConditionalRender from './ConditionalRender'

const styles = {
	brand: {
		textDecoration: 'none',
		marginTop: '5px'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	flexBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	appBar: {
		minHeight: '64px'
	},
	collapsedBrand: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		textDecoration: 'none'
	},
	toolbar: {
		height: '56px'
	}
}

const ExpandedNavbar = classes =>
	<AppBar className={classes.appBar}>
		<Toolbar className={classes.toolbar}>
			<IconButton className={classes.menuButton} color='inherit'>
				<MenuIcon />
			</IconButton>
			<div className={classes.flexBox}>
				<div>
					<Button component={Link} color='inherit' to={pages.landing.path}>
						About
					</Button>
					<Button
						component={Link}
						color='inherit'
						to='/privacyPolicy'
					>
						Privacy Policy
					</Button>
				</div>
				<Typography
					variant='title'
					color='secondary'
					className={classes.brand}
					component={Link}
					to={pages.root.path}
				>
					Harmony
				</Typography>
				<div>
					{/* <Button component='a'color='inherit' href='https://harmony.auth.us-west-2.amazoncognito.com/signup?response_type=token&client_id=15cs6b84gu1tvp2ctu69kqncft&redirect_uri=http://localhost:3001'>
						Register
					</Button>
					<Button component='a' color='inherit' href='https://harmony.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=15cs6b84gu1tvp2ctu69kqncft&redirect_uri=http://localhost:3001/signedIn'>
						Login
					</Button> */}
					<Button component={Link} color='inherit' to='/register'>
						Register
					</Button>
					<Button component={Link} color='inherit' to='login'>
						Login
					</Button>
				</div>
			</div>
			</Toolbar>
	</AppBar>

const CollapsedNavbar = classes =>
	<AppBar>
		<Toolbar>
			<IconButton className={classes.menuButton} color='inherit'>
				<MenuIcon />
			</IconButton>
			<Typography
				variant='title'
				color='inherit'
				className={classes.collapsedBrand}
				component={Link}
				to={pages.root.path}
			>
				Harmony
			</Typography>
		</Toolbar>
	</AppBar>

const Navbar = ({ classes }) =>
	<ConditionalRender
		threshold={625}
		AboveComponent={ExpandedNavbar(classes)}
		BelowComponent={CollapsedNavbar(classes)}
		className='navbar'
	/>

Navbar.propTypes = {
	classes: PropTypes.object
}
CollapsedNavbar.propTypes = {
	classes: PropTypes.object
}
ExpandedNavbar.propTypes = {
	classes: PropTypes.object
}

export default withStyles(styles)(Navbar)