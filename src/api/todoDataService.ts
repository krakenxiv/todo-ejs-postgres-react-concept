import Todo from '../models/todo';
import axios from 'axios';

const getTodos = async () => {
  const todos = await axios.get(`${process.env.REACT_APP_CYCLIC_HOST}/todos`);
  return todos;
};

const createTodo = async (todo: Todo) => {
  return await axios.post(`${process.env.REACT_APP_CYCLIC_HOST}/todos`, todo);
};

const updateTodo = async (todo: Todo) => {
  return await axios.put(`${process.env.REACT_APP_CYCLIC_HOST}/todos`, todo);
};

const deleteTodo = async (todo: Todo) => {
  return await axios.delete(
    `${process.env.REACT_APP_CYCLIC_HOST}/todos/${todo.id}`
  );
};

const TodoDataService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default TodoDataService;
