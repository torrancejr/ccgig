import React, { Component } from 'react';
import User from './User';

class UsersList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 9,
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

  componentDidMount(){
    this.getData();
  }

  render () {
    let indexOfLastUser = this.state.currentPage * this.state.usersPerPage;
     let indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
     let currentUsers;

     if (indexOfFirstUser < 0 ) {
          currentUsers = this.state.users.slice(0, 10);
        } else if (indexOfLastUser > this.state.users.length) {
          currentUsers = this.state.users.slice(indexOfFirstUser, indexOfLastUser)
        } else {
          currentUsers = this.state.users.slice(indexOfFirstUser, indexOfLastUser);
        }


     let finalUsers = currentUsers.map((user, index) => {
        return (
          <User
            key={index}
            id={user.id}
            username={user.username}
            rating={user.rating}
          />
        )
      });

      let pageNumbers = [];

      for(let i = 1; i <= Math.ceil(this.state.users.length / this.state.usersPerPage); i++) {
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
            {finalUsers}
          </div>
        </div>
        <div className="pagination">
          {renderPageNumbers}
        </div>
      </div>
    )
  }
}

export default UsersList;
