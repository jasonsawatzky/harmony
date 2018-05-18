import React, { Component } from 'react'
import axios from 'axios'

export default class Status extends Component {
	state = { status : '' }

	getStatus = () => {
		axios.get('http://localhost:3000/status')
			.then(response => this.setState({status : response.data}))
			.catch(error => console.log(error))
	}

	componentDidMount = () => {
		this.getStatus()
	}

	render = () => (
		<h1>{this.state.status}</h1>
	)
}
