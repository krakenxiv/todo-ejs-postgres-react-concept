export default interface Todo {
  id: string;
  todo_name: string;
  todo_description: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  getAllTodosStatus: string;
  updateTodoStatus: string;
  createTodoStatus: string;
  deleteTodoStatus: string;
  error: any;
}
