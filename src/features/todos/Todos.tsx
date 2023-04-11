import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // addTodo,
  // removeTodo,
  // editTodo,
  fetchTodos,
  // selectAllTodos,
  updateTodo,
  addNewTodo,
  deleteTodo
} from './todosSlice';
// import TodoDataService from '../../api/todoDataService';
import TodoItem from '../../components/todoItem/todoItem';
import Modal from '../../components/modal/modal';
import classes from './todos.module.scss';
import Todo from '../../models/todo';

// TODO install bootstrap npm OR create custom global css vars

const Todos = () => {
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [editId, setEditId] = useState('');
  const [editCompleted, setEditCompleted] = useState(Boolean);


  // const todoList = useSelector(selectAllTodos);
  const todoList = useSelector((state: any) => {
    if(state && state.todos && state.todos.todos) {
      return state.todos.todos;
    }
    else {
      return null;
    }
  });
  const todoStatus = useSelector((state: any) => {
    return state.todos.status;
  });
  const todoError = useSelector((state: any) => {
    return state.todos.error;
  });

  useEffect(() => {
    if (todoStatus === 'idle') {
      // @ts-ignore
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  const handleAddTodos = () => {
    setNameValue('');
    setDescriptionValue('');
  };

  const handleRemoveTodo = (todo: Todo) => {
    // @ts-ignore
    dispatch(deleteTodo(todo));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditCompleted(todo.completed);
    setEditId(todo.id);
  };

  const handleAddNewTodo = (name: string, description: string) => {
    if (name !== '' && description !== '') {
      // dispatch(addTodo(name, description, Date.now()));

      let newTodo = {
        todo_name: name,
        todo_description: description,
        completed: false,
        date_modified: 4567,
      };
      // createTodo(mockTodo);
      //@ts-ignore
      dispatch(addNewTodo(newTodo));
    }
  };

  const handleUpdateTodo = (name: string, description: string) => {
    if (name !== '' && description !== '') {
      let updatedTodo = {
        id: editId,
        todo_name: name,
        todo_description:description,
        completed: editCompleted,
      };
      // dispatch(editTodo(editId, name, completed, description, Date.now()));
      //@ts-ignore
      dispatch(updateTodo(updatedTodo));
    }
  };

  let content;

  if (todoStatus === 'loading') {
    content = <h1>Loading...</h1>;
  } else if (todoStatus === 'succeeded') {
    content = todoList.map((todo: Todo) => {
      if(todo && todo.id) {
        return (
          <TodoItem
          todo={todo}
          editHandler={() => handleEditTodo(todo)}
          deleteHandler={() => handleRemoveTodo(todo)}
          // deleteHandler={() => testHandleEditTodo(todo)}
          key={todo.id}
          />
          )
        }else {
          return null;
        }
    });
    // content = <h1>content</h1>;
  } else if (todoStatus === 'failed') {
    content = <div>{todoError}</div>;
  }

  return (
    <>
      <Modal
        actionName="Edit"
        id="editTodoModal"
        updateModal={(
          name: string,
          description: string,
        ) => {
          handleUpdateTodo(name, description);
        }}
      />

      <Modal
        actionName="Todo"
        id="addTodoModal"
        updateModal={(n: string, d: string) => {
          handleAddNewTodo(n, d);
        }}
      />

      <div>
        <div className={`d-flex justify-content-end ${classes.addBtn}`}>
          <button
            className={`btn btn-primary`}
            onClick={handleAddTodos}
            data-bs-toggle="modal"
            data-bs-target="#addTodoModal"
          >
            +
          </button>
        </div>
        <h1>Todo Manager</h1>
        <div className={`container`}>{content}</div>
      </div>
    </>
  );
};

export default Todos;

/*
  const handleAddTodos = () => {
    // console.log('handleAddTodos');
    // if (nameValue !== '' && descriptionValue !== '') {
    //   // dispatch(addTodo(nameValue, descriptionValue, Date.now()));
    //   let mockTodo = {
    //     id: '',
    //     todo_name: '',
    //     todo_description: '',
    //     completed: false,
    //     date_modified: 4567,
    //   };
    //   createTodo(mockTodo);
    // }
    setNameValue('');
    setDescriptionValue('');
  };
*/