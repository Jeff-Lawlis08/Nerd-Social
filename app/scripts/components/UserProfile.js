import React from 'react';
import store from '../store';
import ProfileReviews from './ProfileReviews';
import {browserHistory} from 'react-router';

export default React.createClass({
  getInitialState(){

        return {
          user: {},
          reviews: [],
          owned: false,
          editing: false
        };

  },
  componentWillReceiveProps(nextProps){
    if(nextProps.params.id!==this.props.params.id){
      this.setState(this.getInitialState());
      // store.user.clear();
      store.user.fetch({url: 'https://api.backendless.com/v1/data/users/'+nextProps.params.id});
      store.reviews.fetch({data: {where: `ownerId='${nextProps.params.id}'`}});
      if(nextProps.params.id===window.localStorage.getItem('ownerId')){
        this.setState({owned: true})
      } else {
        this.setState(this.componentDidMount());
      }
    }
  },
  componentWillMount(){
    if(this.props.params.id===window.localStorage.getItem('ownerId')){
      this.setState({owned: true})
    }
  },
  componentDidMount(){

    store.user.fetch({url: 'https://api.backendless.com/v1/data/users/'+this.props.params.id});
    store.reviews.fetch({data: {where: `ownerId='${this.props.params.id}'`}});
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
    let addPhoto;
    if(this.state.user.pic){
      photo = this.state.user.pic;
    } else {
      photo = '../../assets/images/no-image.png';
    }
    if(this.state.owned===true && this.state.editing===false){
      if(!this.state.user.pic){
      addPhoto = <input onClick={this.handlePhoto} type="button" value="Add a Photo"/>
    }
      if(this.state.user.bio){
      userBio = (
        <div className="bio">
          <span>Bio</span>
          <p>{this.state.user.bio}
          </p>
          <button onClick={this.handleBioEdit}>
            <i className="fa fa-pencil-square" aria-hidden="true"></i>
          </button>
        </div>
      );
    } else {
      userBio = (
        <div className="edit-bio">
          <span>Edit Bio</span>
          <form className="bio-edit-form" onSubmit={this.handleSubmit}>
            <textarea ref="bio" placeholder="Add a Bio!"/>
            <input onClick={this.handleCancel} type="button" value="Cancel"/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      );
    }
  } else if(this.state.owned===false){
    if(this.state.user.bio){
    userBio = (
      <div className="bio">
        <span>Bio</span>
        <p>{this.state.user.bio}</p>
      </div>
    );
  } else {
    userBio = (<span>No user bio available</span>);
  }
} else if(this.state.editing===true){
  userBio =  (
      <div className="edit-bio">
        <span>Edit Bio</span>
        <form className="bio-edit-form" onSubmit={this.handleBioResave}>
          <textarea ref="bio" defaultValue={this.state.user.bio}/>
          <input onClick={this.handleCancel} type="button" value="Cancel"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
  );
}
    return (
      <div className="user-page">
        <div className="user-info">
          <div className="name-pic">
            <h3>{this.state.user.name}</h3>
            <img src={photo}/>
            {addPhoto}
          </div>
          {userBio}
        </div>
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
  handleCancel(e){
    this.setState({editing: false});
  },
  handleBioResave(e){
    e.preventDefault();
    let bio = this.refs.bio.value;
    store.user.save({bio});
    this.setState({editing: false});
  },
  handlePhoto(e){
    browserHistory.push('/user/images/'+this.props.params.id)
  }
});
