
import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div className="card-info">
          <a href={`/users/${this.props.id}`}>
          <h3>Username: {this.props.username}</h3>
        </a>
        </div>
      </div>
    )
  }
}

export default User;
