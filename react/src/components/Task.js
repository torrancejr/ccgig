import React, { Component } from 'react';

class Task extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div className="card-info">
          <a href={`/tasks/${this.props.id}`}>
          <h3>Name: {this.props.name}</h3>
        </a>
        </div>
      </div>
    )
  }
}

export default Task;
