import React, { Component } from "react";
import { Query } from 'react-apollo';

import List from "../Component/List/List";
import { getListByUser } from "../Queries/List";

class ListContainer extends Component {

  state= {
    addNewItem: false,
    selectedListId: "",
    newItemContent: ""
  };

  onClickList = (listId) => {
    this.setState({ addNewItem: true, selectedListId: listId });
  }

  onChangeItemContent = (event) => {
    this.setState({ newItemContent: event.target.value });
  }

  render() {
    return (
      <Query 
        query={getListByUser}
        variables={{userId: "1"}}
      >
        {
          ({ data, loading }) => {
            if(loading || !data || !data.getList ) {
              return "Loading...";
            }

            return (
              data.getList.map(list => 
                <List 
                  key={list.listId} 
                  {...list} 
                  addNewItem={this.state.addNewItem} 
                  onClickList={this.onClickList}
                  selectedListId={this.state.selectedListId}
                  newItemContent={this.state.newItemContent}
                  onChangeItemContent={this.onChangeItemContent}
                />
              )
            )
          }          
        }
      </Query>
    );
  }
}

export default ListContainer;