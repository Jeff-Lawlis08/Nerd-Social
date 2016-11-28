import React from 'react';
import store from '../store';

export default React.createClass({
  getInitialState(){
    return {
      reviews: store.reviews.toJSON()
    }
  },
  componentDidMount(){
    store.reviews.fetch();
    store.reviews.on('update change', this.updateState);
  },
  componentDidMount(){
    store.reviews.off('update change', this.updateState);
  },
  render(){
    // console.log(store.reviews);
    return (
      <div>

      </div>
    );
  },
  updateState(){
    this.setState({reviews: store.reviews.toJSON()})
  }
});
