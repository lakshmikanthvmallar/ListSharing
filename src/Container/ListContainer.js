import React, { Component } from "react";
import { Query } from 'react-apollo';

import List from "../Component/List/List";
import { getListByUser } from "../Queries/List";
import UserList from "../Component/List/UserList";

class ListContainer extends Component {

  state= {
    addNewItem: false,
    selectedListId: "",
    newItemContent: ""
  };

  onClickDelete=(deleteList, listId) => {
    deleteList({
      variables: {
        listId:listId
      },
      update: (store, {data: {deleteList}}) => {
          const data = store.readQuery({
            query: getListByUser, 
            variables: { userId: "1"}
           });
          data.getList.splice(data.getList.findIndex(listItem => listItem.listId === listId), 1);
          store.writeQuery({ query: getListByUser, variables: {userId: "1"}, data })
        }
    })
  }

  onClickList = (listId) => {
    this.setState({ addNewItem: true, selectedListId: listId });
  }

  onChangeItemContent = (event) => {
    this.setState({ newItemContent: event.target.value });
  }

  onHandleCompleteEdit = (updateList, list) => {
    const listData = {
      listId: list.listId,
      listTitle: list.listTitle,
      listContent: this.state.newItemContent.replace("\n", "<br/>"),
      listStatus: list.listStatus,
      createdDate: list.createdDate,
      userIds: '"' + list.userIds.map(userId => userId).join('","') + '"'
    };

    updateList({
      variables: listData
    })
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
              <div>
              {data.getList.map(list => 
                <List 
                  key={list.listId} 
                  list={list} 
                  addNewItem={this.state.addNewItem} 
                  onClickList={this.onClickList}
                  selectedListId={this.state.selectedListId}
                  newItemContent={this.state.newItemContent}
                  onChangeItemContent={this.onChangeItemContent}
                  onClickDelete={this.onClickDelete}
                  handleCompleteEdit={this.onHandleCompleteEdit}
                />
              )}
              <UserList/>
              </div>
            )
          }          
        }
      </Query>
    );
  }
}

export default ListContainer;