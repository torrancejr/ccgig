import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';


$(function() {
  let app = document.getElementById( 'app' );
  if (app) {
  ReactDOM.render(
      <h1>User Reviews Coming Soon</h1>,
      app
    );
  };
});
