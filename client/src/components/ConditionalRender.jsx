import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ConditionalRender extends Component {

	static propTypes = {
		threshold: PropTypes.number.isRequired,
		AboveComponent: PropTypes.element.isRequired,
		BelowComponent: PropTypes.element.isRequired
	}

	state = {
		isAbove: window.innerWidth >= this.props.threshold
	}

	detectThresholdChange = () => {
		const { threshold } = this.props
		const { isAbove } = this.state

		if ((isAbove && window.innerWidth < threshold)
			|| (!isAbove && window.innerWidth >= threshold)) {
				this.setState({ isAbove: !isAbove })
			}
	}

	componentDidMount() {
		window.addEventListener('resize', this.detectThresholdChange)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.detectThresholdChange)
	}

	render() {
		const { AboveComponent, BelowComponent } = this.props
		return this.state.isAbove ? AboveComponent : BelowComponent
	}
}