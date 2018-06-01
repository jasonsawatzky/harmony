import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TodoList from '../../containers/VisibleTodoList'
import Status from '../../components/Status'
import Login from '../../components/Login'
import Tabs from '../../components/Tabs'
import Landing from '../../components/Landing'

export default () => (
	<Switch>
		<Route path='/' exact component={Tabs} />
 		<Route path='/todoList' exact component={TodoList} />
		<Route path='/status' exact component={Status} />
		<Route path='/login' exact component={Login} />
		<Route path='/landing' exact component={Landing} />
	</Switch>
)