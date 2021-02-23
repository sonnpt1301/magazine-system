import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { getFaculty } from './actions';
import { isUserLoggedIn } from './actions/auth.action';
import { getUsers } from './actions/user.action';
import './App.css';
import { PrivateRoute } from './components/HOC/PrivateRoute';
import Faculty from './containers/Faculty';
import Home from './containers/Home';
import Login from './containers/Login';
import User from './containers/User';

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    } else {
      dispatch(getFaculty())
      dispatch(getUsers())
    }
  }, [dispatch, auth.authenticate])

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/faculty" component={Faculty} />
        <PrivateRoute path="/user" component={User} />  

        <Route path="/login" component={Login} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
