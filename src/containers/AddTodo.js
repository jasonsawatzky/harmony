import AddTodo from '../components/AddTodo'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const mapDispatchToProps = dispatch => ({
	onAdd: text => dispatch(addTodo(text))
})

export default connect(
	null,
	mapDispatchToProps
)(AddTodo)