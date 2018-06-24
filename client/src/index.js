import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
})

ReactDOM.render(
	// <Provider store={createStore(reducer)}>
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>,
	// </Provider>,
	document.getElementById('root')
)
