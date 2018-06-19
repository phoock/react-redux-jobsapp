import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createStore ,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//导入组件
import Auth from './auth.jsx'
import Dashboard from './dashboard.jsx'
//导入reducer


import reducers from './reducer'
import { Provider } from 'react-redux'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension:()=>{}
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools()
))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Auth}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)
