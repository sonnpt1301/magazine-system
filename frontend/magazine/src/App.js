import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { isUserLoggedIn } from './actions';
import { getAllContributions, getPublicContribution, getContributionsByFaculty } from './actions/contribution.action';
import { PrivateRoute } from './components/HOC/PrivateRoute';
import Contribution from './containers/Contribution';
import Home from './containers/Home';
import Login from './containers/Login';
import Profile from './containers/Profile';
function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getPublicContribution())
    dispatch(getAllContributions())
    dispatch(getContributionsByFaculty())
  }, [])

  return (

    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/contribution" component={Contribution} />
        <PrivateRoute path="/profile" component={Profile} />

        <Route path="/login" component={Login} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router >
  );
}

export default App;
