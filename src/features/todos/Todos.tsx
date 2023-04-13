import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
  updateSortOrder,
  updateOrderByAsc
} from './todosSlice';
import TodoItem from '../../components/todoItem/todoItem';
import Modal from '../../components/modal/modal';
import classes from './todos.module.scss';
import Todo from '../../models/todo';
import { AppDispatch } from '../../store/store';
// TODO install bootstrap npm OR create custom global css vars
// TODO write basic tests


const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [editId, setEditId] = useState<string | null | undefined>('');
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
    setEditCompleted(todo.completed);
    setEditId(todo.id);
  };

  const handleAddNewTodo = (name: string, description: string) => {
    if (name !== '' && description !== '') {

      let newTodo = {
        todo_name: name,
        todo_description: description,
        completed: false,
      };
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
      dispatch(updateTodo(updatedTodo));
    }
  };

  const handleCheckTodo = (todo: Todo) => {
    const updatedCheck = todo.completed === true ? false : true;
      dispatch(updateTodo({id:todo.id, todo_name:todo.todo_name, todo_description:todo.todo_description, completed: updatedCheck}));
  };

  const sortByHandler = (e: any) => {
    dispatch(updateSortOrder(e.target.value));
  };

  const orderByAscHandler = () => {
    if(orderBy === true) {
      dispatch(updateOrderByAsc(false));
    }else {
      dispatch(updateOrderByAsc(true));
    }
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
        updateModal={(name: string, description: string) => {
          handleAddNewTodo(name, description);
        }}
      />

      <div>
        <div className={`d-flex justify-content-between bg-info ${classes.headerBar}`}>
          <h2 className='text-light'>Todo Manager</h2>
          <button
            className={`btn btn-primary`}
            data-bs-toggle="modal"
            data-bs-target="#addTodoModal"
          >
            ADD TODO +
          </button>
        </div>
        <div className={`d-flex justify-content-between`}>
          <div>
            <label className="form-check-label" htmlFor="sort-by-select">Sort By</label>
            <select className='form-select' id="sort-by-select"onChange={sortByHandler}>
              <option value="name" selected>Name</option>
              <option value="description">Description</option>
              <option value="completed">Completed</option>
              <option value="id">ID</option>
            </select>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="order-by-checkbox" onChange={orderByAscHandler} defaultChecked={orderBy} />
            <label className="form-check-label" htmlFor="order-by-checkbox">ASC</label>
          </div>
        </div>
        <div className={`container`}>{content}</div>
      </div>
    </>
  );
};

export default Todos;
