import React from 'react';
import {Link} from 'react-router';
// import store from '../store';

export default React.createClass({
  render(){
    let photo;
    if(this.props.game.image){
      photo = this.props.game.image.thumb_url;
    }
    return (
      <Link to={`/game/${this.props.game.id}`}>
        <li>
          <span>{this.props.game.name}</span>
          <img src={photo}/>
        </li>
      </Link>
      );
  },
});
