import React from 'react'
import { Paper, Typography, Card, CardContent, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = {
	paper: {
		flex: 1,
		padding: '50px',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textCenter: {
		textAlign: 'center'
	},
	card: {
		width: 275,
		height: 275,
		marginBottom: '20px',
		display: 'inline-block'
	}
}

const Landing = ({ classes }) =>
	<Paper>
		<Typography component='div' className={classes.paper}>
			<h1 className={classes.textCenter}>Harmony</h1>
			<h3 className={classes.textCenter}>
				Secure, private housemate matching
			</h3>
		</Typography>
		<Grid
			container
			direction='row'
			justify='space-around'
		>
			<Grid item>
				<Card className={classes.card}>
					<CardContent>
						<Typography className={classes.textCenter}>
							In depth matching...
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item>
				<Card className={classes.card}>
					<CardContent>
						<Typography className={classes.textCenter}>
							Your information, in your control...
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</Paper>

Landing.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Landing)