import React, { Component } from 'react';

import './App.css';
import ListContainer from './Container/ListContainer';
import AddList from './Component/List/AddList';


class App extends Component {

  render() {
    return (
      <div className="container">
        <AddList />
        <ListContainer />
      </div>
    );
  }
}

export default App;