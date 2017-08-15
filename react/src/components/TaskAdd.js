import React, { Component } from 'react';
import User from './User';
import Task from './Task';
import PostTask from './PostTask';

class TaskAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      task: '',
      tasks: []
    }
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.retrieveTasks = this.retrieveUsers.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  updateTask(event) {
    event.preventDefault();
    this.setState({ task: event.target.value });
  }

  handleSubmit(event) {
    $.ajax({
      url: '/api/v1/tasks',
      method: 'POST',
      data: {
        body: this.state.task
      },
      success: function(data, success, xhr) {
        console.log(data)
      }
    })
  }

  handleDeleteTask(event) {
    let id = event.target.value;
    console.log(id);
    $.ajax({
      url: '/api/v1/tasks/' + id,
      method: 'DELETE',
      success(response) {
          console.log('successfully removed item')
      }
    })
  }

  retrieveUsers() {
    fetch('/api/v1/users.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ users: body["users"] })
      })
      .catch(error => console.error(`Error in fetch ${error.message}`));
    }

  retrieveTasks() {
    fetch('/api/v1/tasks.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ tasks: body["tasks"] })
      })
      .catch(error => console.error(`Error in fetch ${error.message}`));
    }

  findUser(userId) {
    return this.state.users === userId;
  }

  componentDidMount() {
    this.retrieveUsers();
    this.retrieveTasks();
  }

  render() {
    let users = this.state.users
    let user = users.map(user => {
      return (
        <User
        key={user.id}
        UserId={user.id}
        firstName={user.username}
        />
      );
    });

    let task = this.state.tasks.map(post => {
      let user = users[users.findIndex(obj => obj.id == task.user_id)];
      return (
        <Task
        key={task.id}
        taskId={task.id}
        taskUser={task.user_id}
        body={task.body}
        users={users}
        handleDeleteTask={this.handleDeleteTask}
        />
      );
    });

    return (
      <div>
        <div className="row">
            <form onSubmit={this.handleSubmit}>
              <label>
                <div className="small-12 columns medium-6 columns large-6 large-centered columns">
                  <input
                    className="task"
                    placeholder="Task"
                    type="text"
                    value={this.state.task}
                    onChange={this.updateTask}
                  />
                </div>
              </label>
            </form>
        </div>
        <div className="row">
          <div className="small-12 columns medium-6 columns large-6 large-centered columns">
            {task}
          </div>
        </div>
      </div>
    );
  }
};

export default TaskAdd;
