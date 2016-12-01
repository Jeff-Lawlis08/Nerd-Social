import React from 'react';
import store from '../store';
import _ from 'underscore';

import ReviewForm from './ReviewForm';
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
    let regionalDiff;
    let story;
    let gameplay;
    let releases;
    if(this.state.game.description){
    overviewBody = store.games.cleanOverview(this.state.game.description);
    // regionalDiff = store.games.cleanRegional(this.state.game.description);
    // story = store.games.cleanStory(this.state.game.description);
    // gameplay = store.games.cleanGameplay(this.state.game.description);
    // releases = store.games.cleanReleases(this.state.game.description);

  }
    if(this.state.game.image){
      photo = this.state.game.image.medium_url;
    }
    return (
      <div className="game-info">
        <h3>{this.state.game.name}</h3>
        <img src={photo}/>
        <h6>Overview</h6>
        <p>{overviewBody}</p>
        <ReviewForm game={this.state.game}/>
        <Reviews game={this.state.game}/>
      </div>
    );
  },
  // <h6>Regional Differences</h6>
  // <p>{regionalDiff}</p>
  // <h6>Story</h6>
  // <p>{story}</p>
  // <h6>Gameplay</h6>
  // <p>{gameplay}</p>
  // <h6>Releases</h6>
  // <p>{releases}</p>

  updateState(){
    let displayGame = store.games.get(this.props.params.id);
    if(displayGame) {
      this.setState({game: displayGame.toJSON()})
    }
  }
});
