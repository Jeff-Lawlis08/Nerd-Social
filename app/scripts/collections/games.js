import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';

import Game from '../models/game';
import config from '../config';

export default Backbone.Collection.extend({
  model: Game,

  getGames(search){
    this.reset();
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
        this.add(this.parse(response));
      },
      error: ()=>{
        console.log('no games matched');
      }
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
      error: ()=>{
        console.log('no games matched');
      }
  });
},
  cleanOverview(description){
    // console.log(description);
    const regex = /(<([^>]+)>)/ig;
    let re = /<h2>Overview<\/h2>(.+?)<h2>/;
    let body = description.match(re)[1];
    body = body.replace(regex, "").replace('&amp;', " ");
    return body;
  },
  cleanListItem(description){
    const regex = /(<([^>]+)>)/ig;
    let body = description.replace(regex, " ").replace('Overview', " ");
    return body;
  }
});
