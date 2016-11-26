import React from 'react';

export default React.createClass({
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input ref="search" type="text" placeholder="search"/>
        <input type="submit" value="Search"/>
      </form>
    );
  },
  handleSubmit(e){
    let search = this.refs.search.value;
  }
});
