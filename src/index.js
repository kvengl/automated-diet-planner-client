import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from './history'
import './index.css'
import App from './AppContainer'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

window.URL_PREFIX = '/'
const middleware = [thunk, createLogger()]
const store = createStore(reducer, applyMiddleware(...middleware))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App history={history}/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)