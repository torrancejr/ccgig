import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import UsersList from './components/UsersList';
import TasksList from './components/TasksList';
import TaskAdd from './components/TaskAdd';

$(function() {
  let app = document.getElementById( 'app' );
  if (app) {
  ReactDOM.render(
      <UsersList />,
      app
    );
  };
});
$(function() {
  let app = document.getElementById( 'tasks' );
  if (app) {
  ReactDOM.render(
      <TasksList />,
      app
    );
  };
});
$(function() {
  let app = document.getElementById( 'taskadd' );
  if (app) {
  ReactDOM.render(
      <TaskAdd />,
      app
    );
  };
});
