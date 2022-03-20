import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.scss'
function TodoList({ todoList,onTodoClick }) {
    const handleTodoClick = (todo,index) => {
        if(!onTodoClick) return;

        onTodoClick(todo,index);
    }
  return (
    <ul className='todo-list'>
      {todoList.map((item ,index) => (
        <li key={item.id} 
        className={
            clsx({ 
                completed: item.status === 'completed',
                'todo-item':true
            
         })
        }
        onClick={()=>handleTodoClick(item,index)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}

TodoList.defaultProps = {
  todoList: [],
};

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func
};

export default TodoList;
