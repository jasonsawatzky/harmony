import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AccountCircle, Lock } from '@material-ui/icons'
import PropTypes from 'prop-types'

import urls from '../constants/urls'
import { cognitoClientId } from '../constants'

import {
	TextField,
	Button,
	Paper,
	Grid,
	InputAdornment
} from '@material-ui/core'

const styles = theme =>  ({
	gridContainer: {
		height: '100%'
	},
	paper: {
		padding: '5px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '100px',
		minWidth: '400px',
		minHeight: '300px'
	},
	textField: {
		// marginLeft: theme.spacing.unit,
		// marginRight: theme.spacing.unit,
		margin: '20px',
		display: 'block',
		borderRadius: '5px'
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: '20px'
	}
})

class Component extends React.Component {

	static propTypes = {
		classes: PropTypes.object
	}

	state = {
		name: ''
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		})
	}

	render() {
		const { classes } = this.props
		return (
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				className='gridContainer'
			>
				<Grid item>
					<Paper className={classes.paper}>
						<form>
							<Grid
								container
								direction='column'
								justify='space-around'
								alignItems='flex-start'
								className='gridContainer'
							>
								<Grid item>
									<TextField
										autoFocus
										label='Username'
										value={this.state.name}
										onChange={this.handleChange('name')}
										className={classes.textField}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<AccountCircle />
												</InputAdornment>
											)
										}}
									/>
								</Grid>
								<Grid item>
									<TextField
										type='password'
										label='Password'
										className={classes.textField}
										helperText='Between 8 and 12 characters'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Lock />
												</InputAdornment>
											)
										}}
									/>
								</Grid>
								<Grid item>
									<Button
										variant='raised'
										color='primary'
										className={classes.button}
										onClick={() => window.location.href = `${urls.cognito}/login?response_type=code&client_id=${cognitoClientId}&redirect_uri=localhost:3001`}
									>
										<a href='https://harmony.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=15cs6b84gu1tvp2ctu69kqncft&redirect_uri=localhost:3001/login'>Login</a>
									</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(Component)