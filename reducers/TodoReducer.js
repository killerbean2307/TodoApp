import {
  ADD_TODO,
  T0GGLE_TODO_COMPLETE,
  DELETE_TODO,
  SORT_TODO_LIST
} from "../actions/types";
import moment from "moment";

const initState = {
  list: [
    {
      id: 1556095185,
      title: "Learning react",
      isCompleted: true,
      time: 1556095185
    },
    { id: 1556095201, title: "Redux", isCompleted: true, time: 1556095201 },
    {
      id: 1556095206,
      title: "Clean House",
      isCompleted: false,
      time: 1556095201
    }
  ]
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        list: [
          {
            id: moment().unix(),
            title: action.title,
            isCompleted: false,
            time: action.time
          },
          ...state.list
        ]
      };
    case T0GGLE_TODO_COMPLETE:
      return {
        list: state.list.map(todo => {
          if (todo.id == action.id) {
            return { ...todo, isCompleted: !todo.isCompleted };
          } else return todo;
        })
      };
    case SORT_TODO_LIST:
      return {
        list: [...state.list].sort((a, b) => {
          return a.isCompleted - b.isCompleted || b.time - a.time;
        })
      };
    case DELETE_TODO:
      return {
        list: state.list.filter(todo => {
          return todo.id != action.id;
        })
      };
    default:
      return state;
  }
};

export default todoReducer;
