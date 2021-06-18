import React from 'react'
import Login from './Login'
import Register from './Register'
import { Route, Switch } from 'react-router-dom'
import './Auth.styles.scss'

const Auth = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Auth
