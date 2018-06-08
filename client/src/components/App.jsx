import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider, withStyles }
	from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Routes from '../Routes'
import Navbar from './Navbar'

const theme = createMuiTheme({
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

class App extends Component {

	state = {
		userData: null
	}

	render = () =>
		<div className={this.props.classes.appContent}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Navbar />
				<Routes
					onSignIn={userData => this.setState({ userData })}
					userData={this.state.userData}
				/>
			</MuiThemeProvider>
		</div>
}

App.propTypes = {
	classes: PropTypes.object
}

export default withStyles(styles)(App)