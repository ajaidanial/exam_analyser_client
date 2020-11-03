import { Redirect, Route } from 'react-router-dom'
import React from 'react'

// protected route will not allow the user to access the page unless hes logged in
export const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('auth_key') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

// non protected route like a login page will only be allowed to access if the user is logged out
export const NonAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('auth_key') ? (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
)
