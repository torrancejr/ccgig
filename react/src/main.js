import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import UsersList from './components/UsersList';


$(function() {
  let app = document.getElementById( 'app' );
  if (app) {
  ReactDOM.render(
      <UsersList />,
      app
    );
  };
});
