import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { AppDispatch } from '../../store/store';
import {
  fetchTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
  updateSortOrder,
  updateOrderByAsc,
} from './todosSlice';
import TodoItem from '../../components/todoItem/todoItem';
import Modal from '../../components/modal/modal';
import classes from './todos.module.scss';
import Todo from '../../models/todo';
import Logout from '../../components/logout/logout';
// TODO install bootstrap npm OR create custom global css vars
// TODO write basic tests
// TODO stack selects when page is mobile

const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editId, setEditId] = useState<string | null | undefined>('');
  const [previousName, setPreviousName] = useState<string>('');
  const [previousDescription, setPreviousDescription] = useState<string>('');

  const [editCompleted, setEditCompleted] = useState(Boolean);
  const { user } = useAuth0();

  const todoList = useSelector((state: any) => {
    if (state && state.todos && state.todos.todos) {
      return state.todos.todos;
    } else {
      return null;
    }
  });
  const getAllTodosStatus = useSelector((state: any) => {
    return state.todos.getAllTodosStatus;
  });
  const todoError = useSelector((state: any) => {
    return state.todos.error;
  });
  const orderBy = useSelector((state: any) => {
    return state.todos.orderByAsc;
  });

  useEffect(() => {
    if (getAllTodosStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [getAllTodosStatus, dispatch]);

  const handleRemoveTodo = (todo: Todo) => {
    dispatch(deleteTodo(todo));
  };

  const handleEditTodo = (todo: Todo) => {
    setPreviousName(todo.todo_name);
    setPreviousDescription(todo.todo_description);
    setEditCompleted(todo.completed);
    setEditId(todo.id);
  };

  const handleAddNewTodo = (name: string, description: string) => {
    let submitError = '';
    if (name === '') {
      submitError += `Name cannot be blank\n`;
    }
    if (description === '') {
      submitError += `Description cannot be blank\n`;
    }
    if (name.length > 256) {
      submitError += `Name cannot be more than 256 characters\n`;
    }
    if (description.length > 256) {
      submitError += `Description cannot be more than 256 characters\n`;
    }
    if (submitError === '') {
      let newTodo = {
        todo_name: name,
        todo_description: description,
        completed: false,
      };
      dispatch(addNewTodo(newTodo));
    } else {
      alert(submitError);
    }
  };

  const handleUpdateTodo = (name: string, description: string) => {
    let submitError = '';
    if (name === '') {
      submitError += `Name cannot be blank\n`;
    }
    if (description === '') {
      submitError += `Description cannot be blank\n`;
    }
    if (name.length > 256) {
      submitError += `Name cannot be more than 256 characters\n`;
    }
    if (description.length > 256) {
      submitError += `Description cannot be more than 256 characters\n`;
    }
    if (submitError === '') {
      let updatedTodo = {
        id: editId,
        todo_name: name,
        todo_description: description,
        completed: editCompleted,
      };
      dispatch(updateTodo(updatedTodo));
    } else {
      alert(submitError);
    }
  };

  const handleCheckTodo = (todo: Todo) => {
    const updatedCheck = todo.completed === true ? false : true;
    dispatch(
      updateTodo({
        id: todo.id,
        todo_name: todo.todo_name,
        todo_description: todo.todo_description,
        completed: updatedCheck,
      })
    );
  };

  const sortByHandler = (e: any) => {
    dispatch(updateSortOrder(e.target.value));
  };

  const orderByAscHandler = (e: any) => {
    if (e.target.value === 'asc') {
      dispatch(updateOrderByAsc(true));
    } else {
      dispatch(updateOrderByAsc(false));
    }
  };

  let content;

  if (getAllTodosStatus === 'loading') {
    content = (
      <div className={classes.loader}>
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
    );
  } else if (getAllTodosStatus === 'succeeded') {
    content = todoList.map((todo: Todo) => {
      if (todo && todo.id) {
        return (
          <TodoItem
            todo={todo}
            editHandler={() => handleEditTodo(todo)}
            deleteHandler={() => handleRemoveTodo(todo)}
            checkHandler={() => {
              handleCheckTodo(todo);
            }}
            key={todo.id}
          />
        );
      } else {
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
        previousName={previousName}
        previousDescription={previousDescription}
        updateModal={(name: string, description: string) => {
          handleUpdateTodo(name, description);
        }}
      />

      <Modal
        actionName="Todo"
        id="addTodoModal"
        previousName=""
        previousDescription=""
        updateModal={(name: string, description: string) => {
          handleAddNewTodo(name, description);
        }}
      />

      <div>
        <div className={classes.userBar}>
          {user && user.name ? (
            <span className={classes.userInfo}>Welcome {user.name}</span>
          ) : null}
          <Logout />
        </div>
        <div className={`d-flex justify-content-between ${classes.headerBar}`}>
          <h2 className="text-light">Todo Manager</h2>
          <button
            className={`btn btn-primary`}
            data-bs-toggle="modal"
            data-bs-target="#addTodoModal"
          >
            ADD TODO +
          </button>
        </div>
        <div className={`${classes.sortRow}`}>
          <div className={`${classes.sortBy}`}>
            <label
              className={`form-check-label ${classes.selectLabel}`}
              htmlFor="sort-by-select"
            >
              Sort By
            </label>
            <select
              className={`form-select ${classes.sortSelect}`}
              id="sort-by-select"
              onChange={sortByHandler}
            >
              <option value="name" defaultValue={'name'}>
                Name
              </option>
              <option value="description">Description</option>
              <option value="completed">Completed</option>
              <option value="id">ID</option>
            </select>
          </div>
          <div className={`${classes.orderBy}`}>
            <label
              className={`form-check-label ${classes.selectLabel}`}
              htmlFor="order-by-select"
            >
              Order By
            </label>
            <select
              className={`form-select ${classes.sortSelect}`}
              id="order-by-select"
              onChange={orderByAscHandler}
            >
              <option value="asc" defaultValue={'asc'}>
                ASC
              </option>
              <option value="desc">DESC</option>
            </select>
          </div>
        </div>
        <div className={`container`}>{content}</div>
      </div>
    </>
  );
};

export default Todos;
