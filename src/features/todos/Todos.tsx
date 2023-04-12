import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
  // checkedTodo
} from './todosSlice';
import TodoItem from '../../components/todoItem/todoItem';
import Modal from '../../components/modal/modal';
import classes from './todos.module.scss';
import Todo from '../../models/todo';

// TODO install bootstrap npm OR create custom global css vars
// TODO hook checkboxes up to redux and data service
// TODO write basic tests


const Todos = () => {
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [editId, setEditId] = useState('');
  const [editCompleted, setEditCompleted] = useState(Boolean);
  const todoList = useSelector((state: any) => {
    if(state && state.todos && state.todos.todos) {
      return state.todos.todos;
    }
    else {
      return null;
    }
  });
  const getAllTodosStatus = useSelector((state: any) => {
    return state.todos.getAllTodosStatus;
  });
  const todoError = useSelector((state: any) => {
    return state.todos.error;
  });

  useEffect(() => {
    if (getAllTodosStatus === 'idle') {
      // @ts-ignore
      dispatch(fetchTodos());
    }
  }, [getAllTodosStatus, dispatch]);

  // useEffect(() => {
  //   if (todoStatus === 'idle') {
  //     // @ts-ignore
  //     dispatch(fetchTodos());
  //   }
  // }, [todoStatus, dispatch]);

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

  const handleCheckTodo = (todo: Todo) => {
    const updatedCheck = todo.completed === true ? false : true;
      // @ts-ignore
      dispatch(updateTodo({id:todo.id, todo_name:todo.todo_name, todo_description:todo.todo_description, completed: updatedCheck}));
      // dispatch(checkedTodo(todo));
  };

  let content;

  if (getAllTodosStatus === 'loading') {
    content = 
    <div className={classes.loader}>
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  } else if (getAllTodosStatus === 'succeeded') {
    content = todoList.map((todo: Todo) => {
      if(todo && todo.id) {
        return (
          <TodoItem
          todo={todo}
          editHandler={() => handleEditTodo(todo)}
          deleteHandler={() => handleRemoveTodo(todo)}
          checkHandler={() => {handleCheckTodo(todo)}}
          key={todo.id}
          />
          )
        }else {
          return null;
        }
    });
  } else if (getAllTodosStatus === 'failed') {
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
            ADD TODO +
          </button>
        </div>
        <h2 className='text-light'>Todo Manager</h2>
        <div className={`container`}>{content}</div>
      </div>
    </>
  );
};

export default Todos;
