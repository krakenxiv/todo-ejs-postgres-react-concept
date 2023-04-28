import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  fetchTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
  updateSortOrder,
  updateOrderByAsc,
} from '../../slices/todos/todosSlice';
import TodoItem from '../todoItem/todoItem';
import Modal from '../modal/modal';
import Todo from '../../models/todo';
import Header from '../header/header';
import classes from './todos.module.scss';
// TODO install bootstrap npm OR create custom global css vars
// TODO write basic tests
// TODO stack selects when page is mobile
interface TodoProps {
  toastHandler: Function;
}

const Todos = (props: TodoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editId, setEditId] = useState<string | null | undefined>('');
  const [previousName, setPreviousName] = useState<string>('');
  const [previousDescription, setPreviousDescription] = useState<string>('');
  const [editCompleted, setEditCompleted] = useState(Boolean);

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
    if (submissionContainsErrors(name, description) === false) {
      let newTodo = {
        todo_name: name,
        todo_description: description,
        completed: false,
      };
      dispatch(addNewTodo(newTodo));
    } else {
      return;
    }
  };

  const handleUpdateTodo = (name: string, description: string) => {
    if (submissionContainsErrors(name, description) === false) {
      let updatedTodo = {
        id: editId,
        todo_name: name,
        todo_description: description,
        completed: editCompleted,
      };
      dispatch(updateTodo(updatedTodo));
    } else {
      return;
    }
  };
  let nameError = '';
  let descriptionError = '';

  const submissionContainsErrors = (name: string, description: string) => {
    if (name === '') {
      nameError += `Name cannot be blank.\n`;
    }
    if (description === '') {
      descriptionError += `Description cannot be blank.\n`;
    }
    if (name.length > 256) {
      nameError += `Name cannot be more than 256 characters.`;
    }
    if (description.length > 256) {
      descriptionError += `Description cannot be more than 256 characters.`;
    }
    if (nameError === '' && descriptionError === '') {
      return false;
    } else {
      props.toastHandler(nameError + ' ' + descriptionError);
      return true;
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

  let todoListDisplay;

  if (getAllTodosStatus === 'loading') {
    todoListDisplay = (
      <div className={classes.loader}>
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
    );
  } else if (getAllTodosStatus === 'succeeded') {
    todoListDisplay = todoList.map((todo: Todo) => {
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
    todoListDisplay = <div>{todoError}</div>;
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
        <Header
          handleSortChange={(e: Event) => {
            sortByHandler(e);
          }}
          handleOrderbyChange={(e: Event) => {
            orderByAscHandler(e);
          }}
        />
        <div className={`container`}>{todoListDisplay}</div>
      </div>
    </>
  );
};

export default Todos;
