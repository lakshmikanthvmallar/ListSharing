import gql from 'graphql-tag';

const getListByUser = gql`
  query getListByUser($userId: String!) {
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
  mutation CreateList($listTitle: String!, $listStatus: String!, $userIds: String!, $listContent: String  ) {
    createList(listTitle: $listTitle, listStatus:$listStatus, userIds:$userIds, listContent: $listContent ) {  
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
  mutation updateList($listId: String!,$listTitle: String!, $listStatus: String!, $userIds: String!, $listContent: String, $createdDate: String ) {
    updateList(listId: $listId,listTitle: $listTitle, listStatus:$listStatus, userIds:$userIds, listContent: $listContent, createdDate: $createdDate ) {
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

const deleteList = gql`
  mutation deleteList($listId: String!) {
    deleteList(listId: $listId) {
      __typename
      listId
    }
  }`

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

export { getListByUser, CreateList, updateList, deleteList,NewListSubscription };