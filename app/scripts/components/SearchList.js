import React from 'react';
import SearchListItem from './SearchListItem';

export default React.createClass({
  render(){
    // console.log(this.props.games.games);
    let allGames = this.props.games.games.map((game, i, arr)=>{
      // console.log(game);
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
