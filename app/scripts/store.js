import React from 'react';

import User from './models/user';
import Games from './collections/games';

export default {
  session: new User(),
  // users: new Users(),
  games: new Games(),
  // reviews: new Reviews()
};
