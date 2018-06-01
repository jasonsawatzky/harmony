import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import './Navbar.css'

const styles = {
	root: {
		flexGrow: 1,
	},
	brand: {
		flex: 1,
		textDecoration: 'none',
		marginLeft: 'calc(50% - 68px)',
		position: 'absolute',
		justifyContent: 'space-between'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	floatRight: {
		float: 'right',
		flex: 1,
	}
}

const Component = ({ classes }) => (
	<div className={classes.root}>
		<AppBar position='static'>
			<Toolbar>
			<IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
				<MenuIcon />
			</IconButton>
			<Button component={Link} color='inherit' to='/about'>About</Button>
			<Button component={Link} color='inherit' to='/privacyPolicy'>Privacy Policy</Button>
			<Button component={Link} color='inherit' to='/landing'>Landing</Button>
			<Typography variant='title' color='inherit' className={classes.brand} component={Link} to='/'>
				Harmony
			</Typography>
			<div className={classes.floatRight}>
				<Button component={Link} color='inherit' to='/register' className={classes.floatRight}>Register</Button>
				<Button component={Link} color='inherit' to='/login' className={classes.floatRight}>Login</Button>
			</div>
			</Toolbar>
		</AppBar>
	</div>
)

export default withStyles(styles)(Component)