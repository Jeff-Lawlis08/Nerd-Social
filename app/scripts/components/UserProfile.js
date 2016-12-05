import React from 'react';
import store from '../store';
import ProfileReviews from './ProfileReviews';

export default React.createClass({
  getInitialState(){
        return {
          user: {},
          reviews: []
        };

  },
  componentDidMount(){
    store.user.fetch({url: 'https://api.backendless.com/v1/data/users/'+this.props.params.id});
    store.reviews.fetch();
    store.user.on('update change', this.updateState);
    store.reviews.on('update change', this.updateState);
    console.log(store.user);
  },
  componentWillUnmount(){
    store.user.off('update change', this.updateState);
    store.reviews.off('update change', this.updateState);
  },
  render(){
    let photo;
    let bio;
    if(this.state.user.pic){
      photo = this.state.user.pic;
    } else {
      photo = '../../assets/images/no-image.png';
    }
    return (
      <div className="User-page">
        <h3>{this.state.user.name}</h3>
        <img src={photo}/>
        <ProfileReviews reviews={this.state.reviews} user={this.state.user}/>
      </div>
    );
  },
  updateState(){
    this.setState({
      user: store.user.toJSON(),
      reviews: store.reviews.toJSON()
    });
  }
});
