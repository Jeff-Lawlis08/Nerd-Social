import Backbone from 'backbone';
import $ from 'jquery';

import Game from '../models/game';
import config from '../config';

export default Backbone.Collection.extend({
  model: Game,

  getGames(search){
    $.ajax({
      url: 'https://www.giantbomb.com/api/search',
      dataType: 'jsonp',
      jsonp: 'json_callback',
      data: {
        query: search,
        'api_key': config.api,
        'resource_type': 'game',
        'format': 'jsonp'
      },
      success: (response)=>{
        // console.log(response.results);
        this.reset();
        this.add(response.results);
      },
      parse: (data)=>{
        // console.log(data.results);
        return data.results;
      }
    });
  }
});
