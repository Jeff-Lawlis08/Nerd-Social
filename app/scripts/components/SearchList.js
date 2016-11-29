import React from 'react';
import SearchListItem from './SearchListItem';

export default React.createClass({
  render(){
    let allGames = this.props.games.games.map((game, i, arr)=>{
      return (
        <SearchListItem key={i} game={game}/>
      );
    });
    return (
      <div>
        <ul className="game-list">
        {allGames}
        </ul>
      </div>
    );
  }
});
