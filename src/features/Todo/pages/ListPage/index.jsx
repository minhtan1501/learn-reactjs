import { Button } from '@material-ui/core';
import queryString from 'query-string';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
function ListPage(props) {

  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];
  const location = useLocation()
  const history = useHistory()
  const [todoList, setTodolist] = React.useState(initTodoList);
  const [todoFilter, setTodoFilter] = React.useState(()=>{
    const params = queryString.parse(location.search)
    
    return  params.status ||'all'
  });
  
  const handleTodoClick = (todo, index) => {
    const newTodoList = [...todoList];

    const newTodo = {
      ...newTodoList[index],
      status: newTodoList[index].status === 'new' ? 'completed' : 'new',
    };
    newTodoList[index] = newTodo;
    setTodolist(newTodoList);
  };

  React.useEffect(()=>{
    const params = queryString.parse(location.search)
    
    setTodoFilter(params.status ||'all');
  },[location.search])

  const handleShowAllClick = () => {
      const params = {status:'all'}
    
      history.push({
          pathname: location.pathname,
          search: queryString.stringify(params),

      })
  };

  const handleNewClick = () => {
    const params = {status:'new'}
    
      history.push({
          pathname: location.pathname,
          search: queryString.stringify(params),

      })
  };

  const handleCompletedClick = () => {
    const params = {status:'completed'}
    
      history.push({
          pathname: location.pathname,
          search: queryString.stringify(params),

      })
  };

  const renderedTodoList = todoList.filter(todo => todoFilter === "all" || todo.status === todoFilter )
  
  const handleFormSubmit = (values) => {
      const newValues = {...values,id:todoList?.length + 1,status: 'new'}
      setTodolist(data=>{
        return [...data,newValues]
      })
  }

  return (
    <div>
        <TodoForm  onSubmit={handleFormSubmit}/>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      <Button variant="outlined" onClick={handleShowAllClick}>
        Show All
      </Button>
      <Button variant="outlined" onClick={handleNewClick}>
        New
      </Button>
      <Button variant="outlined" onClick={handleCompletedClick}>
        Completed
      </Button>
    </div>
  );
}

ListPage.propTypes = {};
ListPage.defaultProps = {};

export default ListPage;
