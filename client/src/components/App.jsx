import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Routes from '../Routes'
import Navbar from './Navbar'

const theme = createMuiTheme({
	// palette: {
	// 	type: 'dark'
	// }
	palette: {
		primary: {
			light: '#D1C4E9',
			main: '#673AB7',
			dark: '#512DA8',
			contrastText: '#FFFFFF'
		},
		secondary: {
			light: '#4DD0E1',
			main: '#26C6DA',
			dark: '#00838F',
			contrastText: '#000000'
		},
		type: 'dark'
	}
})

const styles = {
	appContent: {
		boxSizing: 'content-box',
		paddingBottom: '56px',
		paddingTop: '64px'
	}
}

const App = ({ classes }) =>
	<div className={classes.appContent}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Navbar />
			<Routes />
		</MuiThemeProvider>
	</div>

App.propTypes = {
	classes: PropTypes.object
}

export default withStyles(styles)(App)