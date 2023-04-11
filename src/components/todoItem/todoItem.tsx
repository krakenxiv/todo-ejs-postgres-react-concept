import { timestampToDateConvert } from "../../utilities/utilities";
import Todo from "../../models/todo";
import classes from "./todoItem.module.scss";

interface ToolItemProps {
  todo: Todo;
  editHandler: Function;
  deleteHandler: Function;
}

const TodoItem = (props: ToolItemProps) => {
  return (
    <div className={`${classes.todo}  ${props.todo.completed ? classes.todoFaded : null}`} key={props.todo.id}>
      <span className={`${classes.todoName} ${props.todo.completed ? classes.todoCompleted : null}`}>{props.todo.todo_name}</span>
      <span className={classes.todoDescription}>
        {props.todo.todo_description}
      </span>
      <span>
      <input type="checkbox" checked={props.todo.completed} />
      </span>
      {/* <span className={classes.todoDescription}>
        {props.todo.date_modified}
      </span> */}
      {/* <span className={classes.todoDescription}>
        {timestampToDateConvert(props.todo.date_modified)}
      </span> */}
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
  );
};
export default TodoItem;
