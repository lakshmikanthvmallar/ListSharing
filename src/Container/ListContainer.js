import React, { Component } from "react";
import List from "../Component/List/List";

class ListContainer extends Component {

  render() {
    const { lists } = this.props;
    return (
      lists.map(list => 
        <List key={list.listId} {...list} />
      )
    );
  }
}

export default ListContainer;