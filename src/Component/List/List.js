import React from 'react';
import Item from './Item';
import removeIcon  from '../../assets/remove.png';

const List = (props) => {
  return(
  <div className="list-container" onClick={() => props.onClickList(props.listId)}>
    <div className="list-title">{props.listTitle}</div>

    {(props.addNewItem && props.selectedListId !== null && props.selectedListId === props.listId) ? 
      <textarea 
        className="item-content-teaxtarea"
        type="text" 
        name="item" 
        onChange={props.onChangeItemContent}
      >{props.listContent}</textarea>
      : 
      <Item key={props.listId} listContent={props.listContent} />
    }
    <img src={removeIcon} onClick={() => props.onClickDelete(props.listId)}/>
  </div>
)}

export default List;