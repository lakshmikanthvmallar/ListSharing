import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import './App.css';
import { getListByUser, CreateList, NewListSubscription } from './Queries/List';
import ListContainer from './Container/ListContainer';
import AddList from './Component/List/AddList';


class App extends Component {

  render() {
    return (
      <div className="container">
        {/* <ListContainer /> */}
        <NewList />
        <ShowList />
      </div>
    );
  }
}

export default App;

const ShowList = compose(
  graphql(getListByUser,
    {
      options: {
        fetchPolicy: 'network-only',
        variables: { userId : "1" }
      },
      props: (props) => ({
        lists: props.data.getList,
        subscribeToNewList: params => {
          props.data.subscribeToMore({
            document: NewListSubscription,
              updateQuery: (previousResult, { subscriptionData: { data : { onAddList } } }) => ({
                getList: [
                  ...previousResult.getList.filter(list => list.listId !== onAddList.listId),
                  onAddList
                ]
          })
        });
      },
    })
  }),

)(ListContainer);

const NewList = graphql(CreateList, {
  props: (props) => ({
      test: props,
      onAdd: list => props.mutate({
          variables: list,
          optimisticResponse: () => ({ addList: { ...list, __typename: 'List' } }),
      })
  }),
  options: {
      update: (dataProxy, { data: { addList } }) => {
        console.log(data);
        //addList.listTitle = addList.listTitle + ' PENDING'
        const query = getListByUser;
        const data = dataProxy.readQuery({ query, variables:{userId: "1"} });
        data.getList.push(addList);
        console.log(data)
        dataProxy.writeQuery({ query, data });
      }
  }
})(AddList);