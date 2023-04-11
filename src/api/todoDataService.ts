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
  // console.log(todo);
  /*
  const result = await axios.put('http://localhost:3010/todos', todo);
  console.log(result);
  return result;
  */
  return await axios.put('http://localhost:3010/todos', todo);
};

const deleteTodo = async (todo: Todo) => {
  console.log(todo);
  /*
  return result;
  const result = await axios.delete(`http://localhost:3010/todos/${todo.id}`);
  */
  return await axios.delete(`http://localhost:3010/todos/${todo.id}`);
};

const TodoDataService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default TodoDataService;

// import { useSelector, useDispatch } from 'react-redux';
// import {
//   // addTodo,
//   removeTodo,
//   editTodo,
//   fetchTodos,
//   selectAllTodos,
//   // addNewTodo,
// } from '../features/todos/todosSlice';

// const dispatch = useDispatch();

// export const getTodos =() => {

//   axios.get('http://localhost:3010/todos')
//   .then(function (response:any) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error:any) {
//     // handle error
//     console.log(error);
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
// };

// // // Example POST method implementation:
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// const response = await fetch('http://localhost:3010/todo', {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   mode: 'no-cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   body: JSON.stringify(newTodo), // body data type must match "Content-Type" header
// });
// console.log(response.json());
// return response.json(); // parses JSON response into native JavaScript objects

// fetch("http://localhost:3010/todo", {
//   method: "POST",
//   mode: "cors", // no-cors, *cors, same-origin
//   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: "same-origin", // include, *same-origin, omit
//   headers: {
//     "Content-Type": "application/json",
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: "follow", // manual, *follow, error
//   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   body: JSON.stringify(data), // body data type must match "Content-Type" header
// }).then((response) => response.json());

// const createTodo = async (todo: Todo) => {
// const requestOptions = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(todo),
// };

// await fetch('http://localhost:3010/todos', requestOptions)
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     return data;
//   });
// };
//   // Make a request for a user with a given ID
//   axios
//     .get('http://localhost:3010/todos')
//     .then(async (response) => {
//       // handle success
//       console.log(response);
//       return await response;
//     })
//     .catch((error) => {
//       // handle error
//       console.log(error);
//     })
//     .finally(() => {
//       // always executed
//     });
// };
// const getTodos = async () =>
//   fetch('http://localhost:3010/todos').then((response) => response.json());
