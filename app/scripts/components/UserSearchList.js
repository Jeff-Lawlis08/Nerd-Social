import React from 'react';

import UserSearchItems from './UserSearchItems';

export default React.createClass({
  render(){
    let allUsers = this.props.users.map((user, i, arr)=>{
      return <UserSearchItems key={i} user={user}/>;
    });
    return (
      <ul>
        <h4>Users</h4>
        {allUsers}
      </ul>
    );
  }
});
