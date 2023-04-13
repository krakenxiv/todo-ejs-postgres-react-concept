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

// TODO install bootstrap npm OR create custom global css vars
// TODO write basic tests


const Todos = () => {
  const dispatch = useDispatch();

  const [editId, setEditId] = useState('');
  const [editCompleted, setEditCompleted] = useState(Boolean);
  // const [sortOrder, setSortOrder] = useState('name');
  // const [sortByAsc, setSortByAsc] = useState(Boolean);

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

  const testOrderBy = useSelector((state: any) => {
    return state.todos.orderByAsc;
  });

  // const currSortOrder = useSelector((state: any) => {
  //   return state.todos.sortOrder;
  // });

  useEffect(() => {
    if (getAllTodosStatus === 'idle') {
      // @ts-ignore
      dispatch(fetchTodos());
    }
  }, [getAllTodosStatus, dispatch]);

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
      //@ts-ignore
      dispatch(updateTodo(updatedTodo));
    }
  };

  const handleCheckTodo = (todo: Todo) => {
    const updatedCheck = todo.completed === true ? false : true;
      // @ts-ignore
      dispatch(updateTodo({id:todo.id, todo_name:todo.todo_name, todo_description:todo.todo_description, completed: updatedCheck}));
  };

  const sortByHandler = (e: any) => {
    dispatch(updateSortOrder(e.target.value));
  };

  const orderByAscHandler = () => {
    if(testOrderBy === true) {
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
        <div className={`d-flex justify-content-end ${classes.addBtn}`}>
          <button
            className={`btn btn-primary`}
            data-bs-toggle="modal"
            data-bs-target="#addTodoModal"
          >
            ADD TODO +
          </button>
        </div>
        <h2 className='text-light'>Todo Manager</h2>
        <div>
          <h3>Sort Order</h3>
          <label>Name</label>
          <input type="radio" id="delivery" value="name" name="sortByGroup" required onChange={sortByHandler} defaultChecked={true}  />
          <label>Description</label>
          <input type="radio" id="pick" value="description" name="sortByGroup" onChange={sortByHandler}  />
          <label>Completed</label>
          <input type="radio" value="completed" name="sortByGroup" onChange={sortByHandler} />
          <label>ID</label>
          <input type="radio" value="id" name="sortByGroup" onChange={sortByHandler} />
          <div>
            Sort by ASC
            <input type="checkbox"  onChange={orderByAscHandler} defaultChecked={testOrderBy} />
          </div>
        </div>
        <div className={`container`}>{content}</div>
      </div>
    </>
  );
};

export default Todos;
