import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
