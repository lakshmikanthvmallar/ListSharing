import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import { CreateList, getListByUser } from "../../Queries/List";

export default class AddList extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  static defaultProps = {
    onAdd: () => null
  }

  getInitialState = () => ({
    listTitle: '',
    listContent: 'xczcx',
    listStatus: 'active',
    userIds: '"1","2"'
  });

  handleChange = (field, event) => {
    const { target: { value } } = event;

    this.setState({
      [field]: value
    });
  }

  handleAdd = (CreateList) => {
    const list = {...this.state};
    CreateList({ 
      variables: list, 
      optimisticResponse: {
        createList: {
          __typename: 'List',
          listId: "-1",
          listTitle: list.listTitle,
          listContent: list.listContent,
          listStatus:list.listStatus
        }
      },
      update: (store, { data: { createList } }) => {
        const newData = store.readQuery({
          query: getListByUser,
          variables: {userId: "1"}
        });
        newData.getList.unshift(createList);
        store.writeQuery({
          query: getListByUser,
          variables: {userId: "1"},
          data: newData
        })
      }
    });
    this.setState(this.getInitialState());
  }

  handleCancel = () => {
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <Mutation 
        mutation={CreateList}
      >
        {(CreateList) => (
          <fieldset >
              <legend>Add new List</legend>
              <div>
                <label>List Title
                  <input 
                    type="text" 
                    placeholder="List Title" 
                    value={this.state.listTitle} 
                    onChange={this.handleChange.bind(this, 'listTitle')} 
                  />
                </label>
              </div>
              <div>
                <button onClick={() => this.handleAdd(CreateList)}>Add new List</button>
                <button onClick={this.handleCancel}>Cancel</button>
              </div>
          </fieldset>
        )}
      </Mutation>
    );
  }
}