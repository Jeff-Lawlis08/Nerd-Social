import React from 'react';
import store from '../store';
import SearchList from './SearchList';

export default React.createClass({
  getInitialState(){
    return {
      games: store.games.toJSON()
    }
  },
  componentDidMount(){
    store.games.on('update change', this.updateState);
  },
  componentWillMount(){
    store.games.on('update change', this.updateState);
  },
  componentWillUnMount(){
    store.games.off('update change', this.updateState);
  },
  render(){
    // console.log(store.games);
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="search" type="text" placeholder="search"/>
          <input type="submit" value="Search"/>
        </form>
        <SearchList games={this.state}/>
      </div>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let search = this.refs.search.value;
    store.games.getGames(search);
    // console.log(search);
  },
  updateState(){
    this.setState({games: store.games.toJSON()})
  }
});
