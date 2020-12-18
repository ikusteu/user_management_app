// import from packages
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// import from local components
import App from './App'

// import store
import store from './app/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
