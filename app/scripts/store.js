import React from 'react';

import User from './models/user';
import Games from './collections/games';
import Reviews from './collections/reviews';
import Review from './models/review';

export default {
  session: new User(),
  // users: new Users(),
  games: new Games(),
  reviews: new Reviews(),
  review: new Review()
};
