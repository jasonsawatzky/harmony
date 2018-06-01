import React from 'react'
import { Paper, Typography, Card, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	paper: {
		margin: '50px',
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
		margin: '20px 20px',
		display: 'inline-block'
	}
}

const Component = ({ classes }) => (
	<Paper>
		<Typography component='div' className={classes.paper}>
			<h1 className={classes.textCenter}>Harmony</h1>
			<h3 className={classes.textCenter}>Secure, private housemate matching</h3>
		</Typography>
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.textCenter}>
					In depth matching...
				</Typography>
			</CardContent>
		</Card>
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.textCenter}>
					Your information, in your control...
				</Typography>
			</CardContent>
		</Card>
	</Paper>
)

export default withStyles(styles)(Component)