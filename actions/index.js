import {
  ADD_TODO,
  T0GGLE_TODO_COMPLETE,
  SORT_TODO_LIST,
  DELETE_TODO
} from "./types";

export const addTodo = (title, time) => {
  return {
    type: ADD_TODO,
    title,
    time
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

export const sortTodoList = () => {
  return {
    type: SORT_TODO_LIST
  };
};

export const toggleTodoComplete = id => {
  return {
    type: T0GGLE_TODO_COMPLETE,
    id
  };
};
