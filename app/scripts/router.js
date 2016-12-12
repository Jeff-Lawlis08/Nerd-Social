import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import React from 'react';

import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import GamePage from './components/GamePage';
import UserProfile from './components/UserProfile';
import ImageUpload from './components/ImageUpload';
import RatingsStars from './components/RatingsStars';
import NotFound from './components/NotFound';
const router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Search}/>
      <Route path='/login' component = {Login}/>
      <Route path='/register' component = {Register}/>
      <Route path='/search' component = {Search}/>
      <Route path='/game/:id' component = {GamePage}/>
      <Route path='/user/:id' component = {UserProfile}/>
      <Route path='/user/images/:id' component = {ImageUpload}/>
    </Route>
    <Route path='*' component = {NotFound}/>
  </Router>
);

export default router;
