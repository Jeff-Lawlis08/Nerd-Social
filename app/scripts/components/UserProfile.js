import React from 'react';
import store from '../store';
import ProfileReviews from './ProfileReviews';

export default React.createClass({
  getInitialState(){
        return {
          user: {},
          reviews: [],
          owned: false,
          editing: false
        };

  },
  componentWillMount(){
    if(this.props.params.id===window.localStorage.getItem('ownerId')){
      this.setState({owned: true})
    }
  },
  componentDidMount(){
    store.user.fetch({url: 'https://api.backendless.com/v1/data/users/'+this.props.params.id});
    store.reviews.fetch();
    store.user.on('update change', this.updateState);
    store.reviews.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.user.off('update change', this.updateState);
    store.reviews.off('update change', this.updateState);
  },
  render(){
    let photo;
    let userBio;
    if(this.state.user.pic){
      photo = this.state.user.pic;
    } else {
      photo = '../../assets/images/no-image.png';
    }
    if(this.state.owned===true && this.state.editing===false){
      if(this.state.user.bio){
      userBio = (
        <p>{this.state.user.bio}
          <input onClick={this.handleBioEdit} type="button" value="Edit Bio"/>
        </p>
      );
    } else {
      userBio = (
        <form onSubmit={this.handleSubmit}>
          <input ref="bio" type="text" placeholder="Add a Bio!"/>
          <input type="submit" value="submit"/>
        </form>
      );
    }
  } else if(this.state.owned===false){
    if(this.state.user.bio){
    userBio = (<p>{this.state.user.bio}</p>);
  } else {
    userBio = (<span>No user bio available</span>);
  }
} else if(this.state.editing===true){
  userBio =  (
      <form onSubmit={this.handleBioResave}>
        <input ref="bio" type="text" placeholder={this.state.user.bio}/>
        <input type="submit" value="submit"/>
      </form>
  );
}
    return (
      <div className="User-page">
        <h3>{this.state.user.name}</h3>
        <img src={photo}/>
        {userBio}
        <ProfileReviews reviews={this.state.reviews} user={this.state.user}/>
      </div>
    );
  },
  updateState(){
    this.setState({
      user: store.user.toJSON(),
      reviews: store.reviews.toJSON()
    });
  },
  handleSubmit(e){
    e.preventDefault();
    let bio = this.refs.bio.value;
    store.user.save({bio});
  },
  handleBioEdit(e){
    this.setState({editing: true});
  },
  handleBioResave(e){
    e.preventDefault();
    let bio = this.refs.bio.value;
    store.user.save({bio});
    this.setState({editing: false});
  }
});
