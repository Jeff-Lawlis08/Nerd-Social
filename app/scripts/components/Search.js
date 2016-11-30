import React from 'react';
import store from '../store';
import SearchList from './SearchList';

export default React.createClass({
  getInitialState(){
    return {
      games: store.games.toJSON(),
      reviews: store.reviews.toJSON()
    }
  },
  componentDidMount(){
    store.reviews.fetch();
    store.games.on('update change', this.updateGames);
    store.reviews.on('update change', this.updateGames);
  },
  // componentWillMount(){
  //   store.games.on('update change', this.updateGames);
  //   store.reviews.on('update change', this.updateGames);
  // },
  componentWillUnmount(){
    store.games.off('update change', this.updateGames);
    store.reviews.off('update change', this.updateGames);
  },
  render(){
    // console.log(this.state.reviews);
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="search" type="text" placeholder="search"/>
          <input type="submit" value="Search"/>
        </form>
        <SearchList games={this.state.games} reviews={this.state.reviews}/>
      </div>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let search = this.refs.search.value;
    store.games.getGames(search);
    // console.log(search);
  },
  updateGames(){
    this.setState({games: store.games.toJSON()})
  }
});
