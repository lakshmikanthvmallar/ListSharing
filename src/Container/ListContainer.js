import React, { Component } from "react";
import { Query } from 'react-apollo';

import List from "../Component/List/List";
import { getListByUser,deleteList } from "../Queries/List";

class ListContainer extends Component {

  state= {
    addNewItem: false,
    selectedListId: "",
    newItemContent: ""
  };

  onClickDelete=(listId) => {
    const variables = {
      listId:listId
    }
    deleteList({
      variables,
      update: (store, {data: {deleteList}}) => {
          const data = store.readQuery({
            query: getListByUser, 
            variables: { listId:listId}
           })
          //data.Drawer.list = data.Drawer.list.filter(card => list.listId !== deleteList.list.listId)
          store.writeQuery({query: getListByUser, data})
        }
    })
  }

  onClickList = (listId) => {
    this.setState({ addNewItem: true, selectedListId: listId });
  }

  onChangeItemContent = (event) => {
    this.setState({ newItemContent: event.target.value });
  }

  handleEditComplete = (list) => {
    const listData = {...list};
    // this.setState({  })
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
                  onClickDelete={this.onClickDelete}
                  handleEditComplete={() => this.handleEditComplete(list)}
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