export default interface Todo {
  id: string;
  todo_name: string;
  todo_description: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  status: string;
  error: any;
}
