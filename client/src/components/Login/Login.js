import React from 'react'
import { TextField, Button, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme =>  ({
	verticalCenter: {

	},
	paper: {
		padding: '5px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '100px'
	},
	textField: {
		// marginLeft: theme.spacing.unit,
		// marginRight: theme.spacing.unit,
		margin: '20px',
		width: 400,
		display: 'block'
	},
	button: {
		margin: theme.spacing.unit,
		marginTop: '20px'
	}
})

class Component extends React.Component {
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
			<Paper className={classes.paper}>
				<form autoComplete='off'>
					<TextField
						id='name'
						label='Name'
						className={classes.textField}
						value={this.state.name}
						margin='normal'
						onChange={this.handleChange('name')}
					/>
					<TextField
						id='password-input'
						type='password'
						label='Password'
						className={classes.textField}
						margin='normal'
					/>
					<Button variant='raised' color='primary' className={classes.button}>
						Login
					</Button>
				</form>
			</Paper>
		)
	}
}

export default withStyles(styles)(Component)