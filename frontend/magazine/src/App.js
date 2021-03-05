import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getMessage, getTerms, getUsers, isUserLoggedIn, getAllContributions, listComment, getFaculty } from './actions';
import { PrivateRoute } from './components/HOC/PrivateRoute';
import About from './containers/About';
import Chat from './containers/Chat';
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
    } else {
      dispatch(getAllContributions())
      dispatch(listComment())
      dispatch(getMessage())
      dispatch(getUsers())
      dispatch(getFaculty())
      dispatch(getTerms())
    }

  }, [dispatch, auth.authenticate])

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/contribution" component={Contribution} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path='/chat' component={Chat} />
        

        <Route path='/about' component={About}/>
        <Route path="/login" component={Login} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router >
  );
}

export default App;
