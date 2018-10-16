import React from 'react'
import PropTypes from 'prop-types'

const Profile = profile => (
	<h1>hello {profile}</h1>
)

Profile.propTypes = {
	profile: PropTypes.string.isRequired
}

export default Profile