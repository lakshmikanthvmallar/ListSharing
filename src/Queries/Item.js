import gql from 'graphql-tag';

const getItems = gql`
  query {
    getItems($listId: String){
      items(listId: $listId) {
        itemId
        itemContent
      }
    }
  }
`;

const createItem = gql`
  mutation {
    createItem(itemContent: $itemContent, listId: $listId) {
      itemId
      itemContent
    }
  }
`;

const updateItem = gql`
  mutation {
    updateItem(itemId: $itemId,itemContent: $itemContent,listId: $listId) {
      itemId
      itemContent
    }
  }
`;

export { getItems, createItem, updateItem };