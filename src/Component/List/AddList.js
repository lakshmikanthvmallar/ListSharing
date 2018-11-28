import React, { Component } from "react";
import uuidv1  from 'uuid/v1';

export default class AddList extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  static defaultProps = {
    onAdd: () => null
  }

  getInitialState = () => ({
    listId: '',
    listTitle: '',
    listDescription: 'xczcx',
    listStatus: 'active',
    userId: '1',
    items: []
  });

  handleChange = (field, event) => {
    const { target: { value } } = event;

    this.setState({
      [field]: value
    });
  }

  handleAdd = () => {
    const list = {...this.state};
    const listId = uuidv1();
    list.listId = listId;
    this.props.onAdd(list);
    this.setState(this.getInitialState());
  }

  handleCancel = () => {
    this.setState(this.getInitialState());
  }

  render() {
    return (
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
            <button onClick={this.handleAdd}>Add new List</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
      </fieldset>
    );
  }
}