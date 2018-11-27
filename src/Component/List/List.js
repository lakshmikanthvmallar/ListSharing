import React from 'react';
import Item from './Item';

const List = (props) => {
  return(
  <div className="list-container">
    <div className="list-title">{props.listTitle}</div>
    {props.items.length > 0 ? 
      props.items.map((item) => (
        <Item key={item.itemId} {...item} />
      ))
      : null
    }
  </div>
)}

export default List;