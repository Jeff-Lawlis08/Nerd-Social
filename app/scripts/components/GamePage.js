import React from 'react';
import store from '../store';

import Reviews from './Reviews';

export default React.createClass({
  getInitialState(){
    let displayGame = store.games.get(this.props.params.id);
    if(displayGame) {
      return {game: displayGame.toJSON()}
    } else {
      return {game: {}}
    }
  },
  componentDidMount(){

    let displayGame = store.games.getGameById(this.props.params.id);
    store.games.add({game: displayGame});
    store.games.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.games.off('update change', this.updateState);
  },
  render(){
    let body;
    let photo;
    let overviewBody;
    if(this.state.game.description){
    overviewBody = store.games.cleanOverview(this.state.game.description);
  } else {
    overviewBody = "No overview available"
  }
    if(this.state.game.image){
      photo = this.state.game.image.medium_url;
    }
    return (
      <div className="gamepage-contents">
        <div className="pic-and-info">
          <img src={photo}/>
          <div className="game-info">
            <h3>{this.state.game.name}</h3>
            <h6>Overview</h6>
            <p>{overviewBody}</p>
          </div>
        </div>
        <Reviews game={this.state.game}/>
        </div>
    );
  },
  updateState(){
    let displayGame = store.games.get(this.props.params.id);
    if(displayGame) {
      this.setState({game: displayGame.toJSON()})
    }
  }
});
