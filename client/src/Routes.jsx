import React from 'react'
import { Route, Switch } from 'react-router-dom'

import * as Pages from './constants/pages'

const Routes = () =>
	<Switch>
		{Object.values(Pages).map(({ path, component}) =>
			<Route
				path={path}
				exact
				component={component}
				key={path}
			/>
		)}
	</Switch>

export default Routes