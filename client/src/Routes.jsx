import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import * as Pages from './constants/pages'

const Routes = ({ onSignIn, userData }) =>
	<Switch>
		{Object.values(Pages).map(({ path, Component}) =>
			<Route
				path={path}
				exact
				render={() => <Component childProps={{ onSignIn, userData }} />}
				key={path}
			/>
		)}
	</Switch>

Routes.propTypes = {
	onSignIn: PropTypes.func.isRequired,
	userData: PropTypes.object
}

export default Routes