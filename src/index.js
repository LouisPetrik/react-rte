import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Texter from "./Texter";

class App extends Component {
  render() {
    return <Texter/>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));