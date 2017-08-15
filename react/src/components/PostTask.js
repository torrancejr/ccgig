import React, { Component } from 'react';

class PostTask extends Component{

  render() {
    return(
      <div className="card">
        <div className="row">
          <div className="card-section">
            <div className="float-left">
              {this.props.username}
            </div>
            <form className="float-right">
              <button type="submit" name="Delete" value={this.props.taskId} onClick={this.props.handleDeleteTask} >
                Delete
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="card-section">
            {this.tasks.description}
          </div>
        </div>
      </div>
    )
  }
};

export default PostTask;
