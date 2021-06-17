import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Login from './Login'
import Register from './Register'
import { Route, Switch } from 'react-router-dom'
import './Auth.styles.scss'

const Auth = (props) => {
  return (
    <div>
      <div>
        <TransitionGroup>
          <CSSTransition
            key={props.location.key}
            timeout={500}
            classNames="alert"
          >
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Auth
