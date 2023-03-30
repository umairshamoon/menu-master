import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  let isAuthenticated = false
  const user = localStorage.getItem('user')
  if (JSON.parse(user)?.token) {
    isAuthenticated = true
  }
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/loginChef',
      }}
    />
  )
}

export default PrivateRoute
