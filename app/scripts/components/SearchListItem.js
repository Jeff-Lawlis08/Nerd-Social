import React from 'react';

export default React.createClass({
  render(){
    return (
      <li onClick={this.handleClick}>
        <span>{this.props.game.name}</span>
        <img src={this.props.game.image.thumb_url}/>
      </li>
    );
  },
  handleClick(e){
    browserHistory.push('/game/{this.props.game.id}');
  }
});
