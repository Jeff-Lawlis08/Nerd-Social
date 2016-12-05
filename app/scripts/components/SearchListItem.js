import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
  render(){
    let photo;
    let description;
    if(this.props.game.image){
      photo = this.props.game.image.medium_url;
    } else {
      photo = '../../assets/images/no-thumb.jpg'
    }
    if(this.props.game.description){
      description = store.games.cleanListItem(this.props.game.description);
    } else {
      description = 'No description available';
    }
    return (
      <li className="games">
        <Link to={`/game/${this.props.game.id}`}>
        <div className="game-details">
          <h6>{this.props.game.name}</h6>
          <span>{description}</span>
        </div>
        <img src={photo}/>
        </Link>
      </li>
      );
  },
});
