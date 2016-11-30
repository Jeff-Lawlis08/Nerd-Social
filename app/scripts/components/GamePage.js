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
    if(this.state.game.description){
    const regex = /(<([^>]+)>)/ig
    body = this.state.game.description.replace(regex, " ");
  }
    if(this.state.game.image){
      photo = this.state.game.image.medium_url;
    }
    return (
      <div className="game-info">
        <h3>{this.state.game.name}</h3>
        <img src={photo}/>
        <p>{body}</p>
        <ReviewForm game={this.state.game}/>
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
