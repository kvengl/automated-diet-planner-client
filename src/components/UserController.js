import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import UserLogin from '../containers/UserLoginContainer'
import UserRegister from '../containers/UserRegisterContainer'

function UserController({ user }) {
  return (
    <Switch>
      <Route path={`${window.URL_PREFIX}`} exact>
        <Redirect to={`${window.URL_PREFIX}login`} />
      </Route>

      <Route path={`${window.URL_PREFIX}login`} exact>
        <UserLogin user={user} />
      </Route>

      <Route path={`${window.URL_PREFIX}register`}>
        <UserRegister />
      </Route>

      <Route>
        <Redirect to={`${window.URL_PREFIX}login`} />
      </Route>
    </Switch>
  )
}

export default UserController