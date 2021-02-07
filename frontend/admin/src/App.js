import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import Faculty from './containers/Faculty';
import Home from './containers/Home';
import Login from './containers/Login';
import Contribution from './containers/Contribution';
import { isUserLoggedIn } from './actions/auth.action'
import Profile from './containers/Profile';
import { PrivateRoute } from './components/HOC/PrivateRoute'
import { getFaculty } from './actions';

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getFaculty())
  }, [])

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/faculty" component={Faculty} roles={['admin']}/>
        <PrivateRoute path="/contribution" component={Contribution} roles={['admin']}/>
        <PrivateRoute path="/profile" component={Profile} roles={['admin']}/>

        <Route path="/login" component={Login} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
