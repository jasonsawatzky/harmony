import FilterButtons from '../components/FilterButtons'
import { connect } from 'react-redux'
import { setFilter } from '../actions'

const mapStateToProps = state => ({
	filter: state.filter
})

const mapDispatchToProps = dispatch => ({
	onClick: filter => dispatch(setFilter(filter))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterButtons)