import React from 'react'
import { Typography, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'

const Suggestions = ({ onButtonClick }) =>
	<div>
		<Typography component='div' style={{ padding: 24 }}>
			<h1>Suggestions</h1>
			<Button variant='raised' onClick={onButtonClick}>
				Add Notification
			</Button>
		</Typography>
		{/* <Query query={gql`
			{
				courses(topic:"Node.js") {
					description
					topic
					author
					title
					id
				}
			}
		`}>
			{({ loading, error, data }) => {
				if (loading) return <h1>Loading data...</h1>
				if (error) return <h1>Error retrieving data.</h1>
				return data.courses.map(course =>
					<li key={course.id}>{course.description}</li>
				)
			}}
		</Query> */}
	</div>

Suggestions.propTypes = {
	name: PropTypes.string,
	onButtonClick: PropTypes.func
}

export default Suggestions