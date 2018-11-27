import React, { Component } from "react";

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
    listDescription: 'xczcx',
    listStatus: 'active',
    userId: '1'
  });

  handleChange = (field, event) => {
    const { target: { value } } = event;

    this.setState({
      [field]: value
    });
  }

  handleAdd = () => {
    this.props.onAdd(this.state);
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