import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Home'
import TodoList from '../../containers/VisibleTodoList'
import Status from '../../components/Status'

export default () => (
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/todoList' exact component={TodoList} />
		<Route path='/status' exact component={Status} />
	</Switch>
)