import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App/App'
import rootReducer from './rootReducer'
import configureStore from './configureStore'

const initialState = {}
const store = configureStore(rootReducer, initialState)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
