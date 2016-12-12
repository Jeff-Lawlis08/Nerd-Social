import React from 'react';
import {Link} from 'react-router';

export default React.createClass({

  render(){
    let pic;
    if(this.props.user.pic){
      pic = this.props.user.pic;
    } else {
      pic = '../../assets/images/no-image.png';
    }
    return (
      <li>
        <Link to={`/user/${this.props.user.ownerId}`}>
          <img src={pic}/>
          <h5>{this.props.user.name}</h5>
        </Link>
      </li>
    );
  }
});
