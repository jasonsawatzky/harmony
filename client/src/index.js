import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import config from './config'
console.log("client config", config)
console.log("process.env", process.env)

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
	uri: config.apiUrl + '/graphql'
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
