import React, { useEffect, createContext } from 'react';
import Todos from '../api/TodoModel';

export const TodoContext = createContext({});

export const TodoContextProvider = props => {
  // Initial values are obtained from the props
  const {
    children
  } = props;

  // Use State to store the values
  const [todoList, settodoList] = React.useState([]);

  async function createTable() {
    await Todos.createTable()
  }

  async function setList() {
    createTable();
  }

  useEffect(() => {
    setList();
    refreshList()
  }, [] )

  const addNewTodo = async todo => {
    const props = {
        title: todo.titles,
        completed: todo.completedd,
        createdAt: Date.now(),
    }
    const todos = new Todos(props)
    await todos.save()
    return refreshList();
  };

  const updateTodo = async todo => {
    const props = {
      title: todo.title,
      id: todo.id,
      completed: todo.completed,
      updated_at: Date.now(),
    }
    // const list = changeToggle(todo.id, todo.completed);
    const todos = new Todos(props)
    await todos.save();
    return refreshList();
  };

  const  deleteTodo = async todo => {
    const props = {
      title: todo.title,
      id: todo.id,
      completed: todo.completed,
    }
    // const list = todoList.filter(_todo => todo.id !== _todo.id);
    const todos = new Todos(props)
    await todos.destroy();
    return refreshList();
  };

  const refreshList = async () =>  {
    const list = await Todos.query({});
    return settodoList(list)
  }

  // Make the context object:
  const todoContext = {
    todoList,
    addNewTodo,
    updateTodo,
    deleteTodo,
  };

  // pass the value in provider and return
  return <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>;
};