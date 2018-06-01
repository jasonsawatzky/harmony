import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import Routes from '../Routes'
import Navbar from '../Navbar'

const theme = createMuiTheme({
	palette: {
		type: 'dark'
	}
})

export default () => (
	<div style={{ height: '100%' }}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Navbar />
			<Routes />
		</MuiThemeProvider>
	</div>
)
