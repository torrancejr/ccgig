
import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div className="card-info">
          <h3>Username: {this.props.username}</h3>
          <h4>Rating: {this.props.rating}</h4>
        </div>
      </div>
    )
  }
}

export default User;
