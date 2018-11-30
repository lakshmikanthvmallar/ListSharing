import React from 'react';
import Item from './Item';
import removeIcon  from '../../assets/remove.png';
import { Mutation } from 'react-apollo';
import { updateList, deleteList } from '../../Queries/List';

const List = (props) => {
  return(
    <Mutation
      mutation={updateList}
    >
    {(updateList) => (
      <div className="list-container" onClick={() => props.onClickList(props.list.listId)}>
      <div className="list-title">{props.list.listTitle}</div>
  
      {(props.addNewItem && props.selectedListId !== null && props.selectedListId === props.list.listId) ? 
        <textarea 
          type="text" 
          name="item" 
          onChange={props.onChangeItemContent}
        >{(props.list.listContent && props.list.listContent !== "null") ? props.list.listContent : "" }
        </textarea>
        : 
        <Item 
          key={props.list.listId} 
          listContent={
            (props.list.listContent && props.list.listContent !== "null") ? props.list.listContent : "" } 
          />
      }
      <Mutation
        mutation={deleteList}
      >
        {(deleteList) => (
          <img src={removeIcon} onClick={() => props.onClickDelete(deleteList, props.list.listId)}/>
        )}        
      </Mutation>
      
      <button onClick={() => props.handleCompleteEdit(updateList, props.list )}>Done</button>
    </div>
    )}
  
  </Mutation>
)}

export default List;