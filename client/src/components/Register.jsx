import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import {
	TextField,
	Button,
	Paper,
	Grid
} from '@material-ui/core'

const styles = theme => ({
	gridContainer: {
		height: '100%'
	},
	paper: {
		padding: '50px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '100px',
		minWidth: '400px',
		minHeight: '300px'
	},
	textField: {
		margin: '10px',
		display: 'block'
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: '20px'
	}
})

const REGISTER_USER = gql`
	mutation createUser($user: UserInput) {
		createUser(user: $user)
	}
`

class Register extends React.Component {

	static propTypes = {
		classes: PropTypes.object
	}

	state = {
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		birthdate: ''
	}

	handleChange = name => event => {
		if (name === 'confirmPassword' && this.state.password !== event.target.value) {
			console.log('password missmatch')
			console.log(event)
		} else if (name === 'confirmPassword') console.log('passwords match')

		return this.setState({ [name]: event.target.value })
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
						<Mutation mutation={REGISTER_USER}>
							{registerUser =>
								<form onSubmit={event => {
									event.preventDefault()
									console.log('register: ', this.state)
									registerUser({ variables: { user: this.state } })
								}}>
								<Grid
									container
									direction='column'
									justify='space-around'
									alignItems='center'
									className='gridContainer'
								>
									<Grid item>
										<TextField
											label='First Name'
											name='firstName'
											onChange={this.handleChange('firstName')}
											className={classes.textField}
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											label='Last Name'
											name='lastName'
											onChange={this.handleChange('lastName')}
											className={classes.textField}
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											label='Email'
											name='email'
											className={classes.textField}
											onChange={this.handleChange('email')}
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											autoFocus
											label='Username'
											name='username'
											value={this.state.name}
											onChange={this.handleChange('username')}
											className={classes.textField}
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											type='password'
											label='Password'
											name='password'
											onChange={this.handleChange('password')}
											className={classes.textField}
											helperText='Between 8 and 12 characters'
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											type='password'
											name='confirmPassword'
											label='Confirm Password'
											onChange={this.handleChange('confirmPassword')}
											className={classes.textField}
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											name='birthdate'
											label='Birthdate'
											onChange={this.handleChange('birthdate')}
											className={classes.textField}
											required
										/>
									</Grid>
									<Grid item>
										<Button
											variant='raised'
											color='primary'
											className={classes.button}
											type='submit'
											// onClick={() => window.location.href = `${urls.cognito}/login?response_type=code&client_id=${cognitoClientId}&redirect_uri=localhost:3001`}
										>
											{/* <a href='https://harmony.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=15cs6b84gu1tvp2ctu69kqncft&redirect_uri=localhost:3001/login'>Login</a> */}
											Register
										</Button>
									</Grid>
								</Grid>
								</form>
							}
						</Mutation>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(Register)
