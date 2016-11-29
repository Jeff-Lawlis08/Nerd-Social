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
        this.add(this.parse(response));
      },
    });
  },
  parse: (data)=>{
    // console.log(data.results);
    return data.results.map(r => {r.id = String(r.id); return r});
  },
  getGameById(id){
    $.ajax({
      url: 'https://www.giantbomb.com/api/game/'+id,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      data: {
        'api_key': config.api,
        'format': 'jsonp'
      },
      success: (response)=>{
        // console.log(response.results);
        this.add(response.results);
      },
  });
}
});
