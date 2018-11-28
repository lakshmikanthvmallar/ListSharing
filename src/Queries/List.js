import gql from 'graphql-tag';

const getListByUser = gql`
  query GetListByUser($userId: String!) {
    getList(userId: $userId) {
      __typename
      listId
      listTitle
      listStatus
      items {
        __typename
        itemId
        itemContent
      }
    }
}`;

const CreateList = gql`
  mutation CreateList($listTitle: String!, $listStatus: String!, $userId: String! ) {
    createList(listTitle: $listTitle, listStatus:$listStatus, userId:$userId ) {  
      __typename    
      listId
      listTitle
      listStatus
      items {
        __typename
        itemId
        itemContent
      }
    }
}`;

const updateList = gql`
  mutation {
    updateList(listId: $listId,listTitle: $listTitle, listStatus:$listStatus, userId:$userId, listDescription: $listDescription ) {
      __typename
      listId
      listTitle
      listStatus
      items {   
        __typename     
        itemId
        itemContent
      }
    }
}`;

const NewListSubscription = gql`
  subscription SubscribeToList {
    onAddList {
      __typename
      listId
      listTitle
      listStatus
      items {
        __typename
        itemId
        itemContent
      }
    }
  }`;

export { getListByUser, CreateList, updateList, NewListSubscription };