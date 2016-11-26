import {Router, Route, browserHistory} from 'react-router';
import React from 'react';

import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';

const router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/login' component = {Login}/>
      <Route path='/register' component = {Register}/>
      <Route path='/search' component = {Search}/>
    </Route>
  </Router>
);

export default router;
