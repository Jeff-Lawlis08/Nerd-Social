import Backbone from 'backbone';
import $ from 'jquery';

import Game from '../models/game';
import config from '../config';

export default Backbone.Collection.extend({
  model: Game,

  getGames(search){
    $.ajax({
      url: 'https://www.giantbomb.com/api/search',
      data: {
        query: search,
        'api_key': config.api,
        'resource_type': 'game',
        'format': 'json'
      },
      success: (response)=>{
        console.log(response);
        this.reset();
        this.add(response);
      }
    });
  }
});
