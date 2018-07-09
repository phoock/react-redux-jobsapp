import React from 'react'
import ReactDOM from 'react-dom'
import { createStore ,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'

//导入组件
import Login from 'container/login/login.jsx'
import Register from 'container/register/register.jsx'
import AuthRoute from 'component/authroute/authroute.jsx'
import BossInfo from 'container/bossinfo/bossinfo.jsx'
import Geniusinfo from 'container/geniusinfo/geniusinfo.jsx'
import Dashboard from 'component/dashboard/dashboard.jsx'
import Chat from 'component/chat/chat.jsx'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension:()=>{}
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools()
))
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path="/geniusinfo" component={Geniusinfo}></Route>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>

      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
