import React, { Component } from 'react'
import axios from 'axios'

export default class Status extends Component {
	state = { status : '' }

	getStatus = () => {
		axios.get('localhost:3000/status')
			.then(response => this.setState({ status : response }))
			.catch(error => this.setState({ status : error }))
	}

	render = () => (
		<h1>{this.state.status}</h1>
	)
}