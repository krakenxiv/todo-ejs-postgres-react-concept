import { timestampToDateConvert } from '../../utilities/utilities';
import Todo from '../../models/todo';
import classes from './todoItem.module.scss';

interface ToolItemProps {
  todo: Todo;
  editHandler: Function;
  deleteHandler: Function;
  checkHandler: Function;
}

// TODO! Add pagination

const TodoItem = (props: ToolItemProps) => {
  return (
    <div
      className={`${classes.todo}  ${
        props.todo.completed ? classes.todoFaded : null
      }`}
      key={props.todo.id}
    >
      <div className={`d-flex justify-content-between`}>
        <div className={`${classes.todoText}`}>
          <span
            className={`${classes.todoName} ${
              props.todo.completed ? classes.todoCompleted : null
            }`}
          >
            {props.todo.todo_name}
          </span>
          <span className={classes.todoDescription}>
            {props.todo.todo_description}
          </span>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#editTodoModal"
            onClick={() => {
              props.editHandler();
            }}
          >
            Edit
          </button>
          <button
            className={`btn btn-primary ${classes.btnEnd}`}
            onClick={() => {
              props.deleteHandler();
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <div className={`${classes.todoChecked}`}>
          <input
            className={`form-check-input ${classes.todoCheckboxInput}`}
            type="checkbox"
            id={`complted-${props.todo.id}`}
            onChange={() => {
              props.checkHandler();
            }}
            defaultChecked={!!props.todo.completed}
          />
          <label
            className={`form-check-label ${classes.todoCheckboxLabel}`}
            htmlFor={`completed-${props.todo.id}`}
          >
            completed
          </label>
        </div>
      </div>
    </div>
  );
};
export default TodoItem;
