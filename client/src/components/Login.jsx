import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AccountCircle, Lock } from '@material-ui/icons'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

// import urls from '../constants/urls'
// import { cognitoClientId } from '../constants'

import {
	TextField,
	Button,
	Paper,
	Grid,
	InputAdornment
} from '@material-ui/core'

const styles = theme => ({
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
		margin: '20px',
		display: 'block',
		borderRadius: '5px'
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: '20px'
	}
})

const GET_USER_DATA = gql`
	query user($email: String!) {
		user(email: $email) {
			email
			lastName
		}
	}
`

class Component extends React.Component {

	static propTypes = {
		classes: PropTypes.object
	}

	state = {
		email: '',
		password: '',
		loginClicked: false
	}

	handleChange = name => event => this.setState({ [name]: event.target.value })

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
										label='Email'
										value={this.state.username}
										onChange={this.handleChange('email')}
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
										value={this.state.password}
										onChange={this.handleChange('password')}
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
										onClick={() => this.setState({ loginClicked: true })}
										// onClick={() => window.location.href = `${urls.cognito}/login?response_type=code&client_id=${cognitoClientId}&redirect_uri=localhost:3001`}
									>
										{/* <a href='https://harmony.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=15cs6b84gu1tvp2ctu69kqncft&redirect_uri=localhost:3001/login'>Login</a> */}
										Login
									</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
				{this.state.loginClicked &&
					<Query query={GET_USER_DATA} variables={{ email: this.state.email }}>
						{({loading, error, data}) => {
							if (loading) return 'Loading user data...'
							if (error) return error.message

							return data.user &&
								<h1>Logged in as {data.user.email}.</h1>
						}}
					</Query>
				}
			</Grid>
		)
	}
}

export default withStyles(styles)(Component)