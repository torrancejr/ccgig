import React, { Component } from 'react';
import Task from './Task';

class TasksList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tasks: [],
      currentPage: 1,
      tasksPerPage: 9,
    }
    this.getData = this.getData.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  previousPage(event) {
  let newPage = this.state.currentPage - 1;
  this.setState({ currentPage: newPage })
}

nextPage(event) {
  let newPage = this.state.currentPage + 1;
  this.setState({ currentPage: newPage })
}

handleClick(event){
  this.setState({ currentPage: event.target.id });
};

getData() {
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

  componentDidMount(){
    this.getData();
  }

  render () {
    let indexOfLastTask = this.state.currentPage * this.state.tasksPerPage;
     let indexOfFirstTask = indexOfLastTask - this.state.tasksPerPage;
     let currentTasks;

     if (indexOfFirstTask < 0 ) {
          currentTasks = this.state.tasks.slice(0, 10);
        } else if (indexOfLastTask > this.state.tasks.length) {
          currentTasks = this.state.tasks.slice(indexOfFirstTask, indexOfLastTask)
        } else {
          currentTasks = this.state.tasks.slice(indexOfFirstTask, indexOfLastTask);
        }


     let finalTasks = currentTasks.map((task, index) => {
        return (
          <Task
            key={index}
            id={task.id}
            name={task.name}
          />
        )
      });

      let pageNumbers = [];

      for(let i = 1; i <= Math.ceil(this.state.tasks.length / this.state.tasksPerPage); i++) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = pageNumbers.map(number => {
      return(
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      )
    })

    return (
      <div>
        <div className="card">
          <div className="card-info">
            {finalTasks}
          </div>
        </div>
        <div className="pagination">
          {renderPageNumbers}
        </div>
      </div>
    )
  }
}

export default TasksList;
