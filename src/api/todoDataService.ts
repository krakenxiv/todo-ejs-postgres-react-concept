import Todo from '../models/todo';
import axios from 'axios';

const getTodos = async () => {
  const todos = await axios.get(`${process.env.REACT_APP_LOCAL_HOST}/todos`);
  return todos;
};

const nfyTest = async () => {
  const testPacket = await axios.get(
    `${process.env.REACT_APP_NETLIFY_HOST}/test`
  );
  console.log(testPacket.data);
  return testPacket;
};

const createTodo = async (todo: Todo) => {
  return await axios.post(`${process.env.REACT_APP_LOCAL_HOST}/todos`, todo);
};

const updateTodo = async (todo: Todo) => {
  return await axios.put(`${process.env.REACT_APP_LOCAL_HOST}/todos`, todo);
};

const deleteTodo = async (todo: Todo) => {
  return await axios.delete(
    `${process.env.REACT_APP_LOCAL_HOST}/todos/${todo.id}`
  );
};

const TodoDataService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  nfyTest,
};

export default TodoDataService;
