import React from 'react';
import store from '../store';
import _ from 'underscore';

import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

export default React.createClass({
  getInitialState(){
    return {
      game: {}
    }
  },
  componentDidMount(){
    let displayGame = store.games.get(this.props.params.id);
    console.log(displayGame);

    if(displayGame===undefined){
      displayGame = store.games.getGameById(this.props.params.id);
      // console.log(displayGame);
    }
    store.games.add({game: displayGame});
    store.games.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.games.off('update change', this.updateState);
  },
  render(){
    console.log(this.state.game);
    if(this.state.game.description){
    const regex = /(<([^>]+)>)/ig
    let body = this.state.game.description.replace(regex, " ");
    return (
      <div className="game-info">
        <h3>{this.state.game.name}</h3>
        <p>{body}</p>
        <ReviewForm game={this.state.game}/>
        <Reviews />
      </div>
    );
  }else{
    return <div></div>
  }
  },
  updateState(){
    let displayGame = store.games.get(this.props.params.id);
    if(displayGame) {
      this.setState({game: displayGame.toJSON()})
    }
  }
});
