import Todo, { TodoState } from '../models/todo';
import axios from 'axios';

const getTodos = async () => {
  const todos = await axios.get('http://localhost:3010/todos');
  return todos;
};

const createTodo = async (todo: Todo) => {
  return await axios.post('http://localhost:3010/todos', todo);
};

const updateTodo = async (todo: Todo) => {
  return await axios.put('http://localhost:3010/todos', todo);
};

const deleteTodo = async (todo: Todo) => {
  return await axios.delete(`http://localhost:3010/todos/${todo.id}`);
};

const TodoDataService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default TodoDataService;
