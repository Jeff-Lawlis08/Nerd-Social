import Backbone from 'backbone';
import Game from '../models/game';
import config from '../config';

export default Backbone.Collection({
  model: Game,

  getGames(game){
    $.ajax({
      url: 'https://giantbomb.com/api/search',
      data: {
        query: game,
        apiKey: config.api
      },
      success: (response)=>{
        this.reset();
        this.add(response);
      }
    });
  }
});
