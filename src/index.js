import React from 'react'
import ReactDOM from 'react-dom'
import { createStore ,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import reducers from './reducer'
import './config'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension:()=>{}
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools()
))

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter></BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
