import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

export default class SignedIn extends Component {

	static propTypes = {
		childProps: PropTypes.object.isRequired
	}

	componentDidMount() {
		const url = window.location.href
		const token = url.slice(url.indexOf('#id_token=') + 10, url.indexOf('&'))
		const userData = jwtDecode(token)
		this.props.childProps.onSignIn({
			name: userData.name,
			birthdate: userData.birthdate,
			email: userData.email,
			gender: userData.gender,
			username: userData['cognito:username']
		})
	}

	render() {
		const { userData } = this.props.childProps
		return <h1>Signed in as {userData ? userData.name : ''}.</h1>
	}
}