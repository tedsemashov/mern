import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          CI by Ted
        </p>
          <p>
              on Travis
          </p>
          <p>
              + Heroku
          </p>
          <p>
              + test full way
          </p>
      </header>
    </div>
  );
}

export default App;
