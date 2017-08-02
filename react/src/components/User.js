
import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="table-card">
          <h3>Username: {this.props.username}</h3>
          <h2>Rating: {this.props.rating}</h2>


      </div>
    )
  }
}

export default User;
