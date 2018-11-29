import gql from 'graphql-tag';

const getListByUser = gql`
  query GetListByUser($userId: String!) {
    getList(userId: $userId) {
      __typename
      listId
      listTitle
      listStatus
      listContent
      createdDate
      modifiedDate
      userIds
    }
}`;

const CreateList = gql`
  mutation CreateList($listTitle: String!, $listStatus: String!, $userIds: String! ) {
    createList(listTitle: $listTitle, listStatus:$listStatus, userIds:$userIds ) {  
      __typename    
      listId
      listTitle
      listStatus
      listContent
      createdDate
      modifiedDate
      userIds
    }
}`;

const updateList = gql`
  mutation {
    updateList(listId: $listId,listTitle: $listTitle, listStatus:$listStatus, userIds:$userIds, listDescription: $listDescription ) {
      __typename
      listId
      listTitle
      listStatus
      listContent
      createdDate
      modifiedDate
      userIds
    }
}`;

const NewListSubscription = gql`
  subscription SubscribeToList {
    onAddList {
      __typename
      listId
      listTitle
      listStatus
      listContent
      createdDate
      modifiedDate
      userId
    }
  }`;

export { getListByUser, CreateList, updateList, NewListSubscription };