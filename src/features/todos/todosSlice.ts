import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import TodoDataService from '../../api/todoDataService';
import Todo, { TodoState } from '../../models/todo';

// TODO fix typescript error
// TODO resort list when updated

const initialState = {
  todos: [],
  getAllTodosStatus: 'idle',
  updateTodoStatus: 'idle',
  createTodoStatus: 'idle',
  deleteTodoStatus: 'idle',
  error: null,
} as TodoState;

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (rejectWithValue) => {
    const response = await TodoDataService.getTodos();

    try {
      //@ts-ignore
      return response.data;
    } catch (err) {
      //@ts-ignore
      if (!err.response) {
        throw err;
      }
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo: Todo, { rejectWithValue }) => {
    const response = await TodoDataService.createTodo(newTodo);

    try {
      return response.data;
    } catch (err) {
      //@ts-ignore
      if (!err.response) {
        throw err;
      }
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (newTodo: Todo, { rejectWithValue }) => {
    const response = await TodoDataService.updateTodo(newTodo);

    try {
      return response.data;
    } catch (err) {
      //@ts-ignore
      if (!err.response) {
        throw err;
      }
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todo: Todo, { rejectWithValue }) => {
    const response = await TodoDataService.deleteTodo(todo);

    try {
      console.log(response.data);
      return response.data;
    } catch (err) {
      //@ts-ignore
      if (!err.response) {
        throw err;
      }
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch todos
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.getAllTodosStatus = 'loading';
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.getAllTodosStatus = 'succeeded';
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.getAllTodosStatus = 'failed';
      state.error = action.error.message;
    });
    // add new todo
    builder.addCase(addNewTodo.pending, (state, action) => {
      state.createTodoStatus = 'loading';
    });
    builder.addCase(addNewTodo.fulfilled, (state, action) => {
      state.createTodoStatus = 'succeeded';
      state.todos.push(action.payload);
    });
    builder.addCase(addNewTodo.rejected, (state, action) => {
      state.createTodoStatus = 'failed';
      state.error = action.error.message;
    });
    // update todo
    builder.addCase(updateTodo.pending, (state, action) => {
      state.updateTodoStatus = 'loading';
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.updateTodoStatus = 'succeeded';
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index] = {
        ...state.todos[index],
        ...action.payload,
      };
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.updateTodoStatus = 'failed';
      state.error = action.error.message;
    });
    // delete todo
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.deleteTodoStatus = 'loading';
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.deleteTodoStatus = 'succeeded';
      console.log(action.payload);
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload.toString()
      );
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.deleteTodoStatus = 'failed';
      state.error = action.error.message;
    });
  },
});

export default todosSlice.reducer;
export const selectAllTodos = (state: any) => state.todos.todos;

/*
  updateTodoStatus: string;
  createTodoStatus: string;
  deleteTodoStatus: string;
*/
