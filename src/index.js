import React from 'react'
import ReactDOM from 'react-dom'
import { createStore ,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'

//导入组件
import Login from 'container/login/login.jsx'
import Register from 'container/register/register.jsx'
import AuthRoute from 'component/authroute/authroute.jsx'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension:()=>{}
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools()
))
function Boss(){
  return <h2>boss页面</h2>
}
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Route path="/boss" component={Boss}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </div>

      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
