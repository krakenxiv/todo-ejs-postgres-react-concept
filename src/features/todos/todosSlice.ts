import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import TodoDataService from '../../api/todoDataService';
import Todo, { TodoState } from '../../models/todo';

const initialState = {
  todos: [],
  status: 'idle',
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
      // return response.data;
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
// initialState: [] as Todo[],

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        //todo! find a better way to update value without =
        //see https://redux-toolkit.js.org/usage/immer-reducers
        //@ts-ignore
        state.todos = action.payload;
        //todo! why doesn't the below work?
        //see https://redux-toolkit.js.org/usage/immer-reducers
        // return action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewTodo.pending, (state, action) => {})
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state, action) => {
        // todo! why THE FUCK does adding ANY string to this message break the app when called
        // state.status = 'update record pending';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        console.log(action);
        //@ts-ignore
        // const todo = state.find((todo) => todo.id === action.payload);
        // console.log(current(state.todos));
        // return{...state, [...state.list, {id: new Date().getTime().toString(), title: action.payload.title, complete: false}];}

        //@ts-ignore
        // state.todos = action.payload;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(deleteTodo.pending, (state, action) => {
      //   // state.status = 'delete record pending';
      // })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// export const { addTodo, removeTodo, editTodo } = todosSlice.actions;
// export const { removeTodo } = todosSlice.actions;
export default todosSlice.reducer;

export const selectAllTodos = (state: any) => state.todos.todos;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);

// const initialState = [
//   {
//     id: nanoid(),
//     name: "Go to store",
//     description: "Buy some eggs",
//     dateModified: Date.now(),
//   },
//   {
//     id: nanoid(),
//     name: "Go to gas station",
//     description: "Buy some donuts",
//     dateModified: Date.now(),
//   },
// ];

// const initialState: any = [];
// interface TodoState {
//   todos: Todo[];
//   status: string;
//   error: any;
// }

// useEffect(() => {
//   retrieveTodos();
// }, []);

// const retrieveTodos = () => {
//   TodoDataService.getAll()
//     .then((response) => {
//       setTutorials(response.data);
//       console.log(response.data);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

/*
    // addTodo: {
    //   reducer: (state, action: PayloadAction<Todo>) => {
    //     state.todos.push(action.payload);
    //   },
    //   prepare: (
    //     todo_name: string,
    //     todo_description: string,
    //     date_modified: number
    //   ) => {
    //     const id = nanoid();
    //     return { payload: { id, todo_name, todo_description, date_modified } };
    //   },
    // },

        // editTodo: {
    //   reducer: (state, action: PayloadAction<Todo>) => {
    //     const index = state.todos.findIndex(
    //       (todo: Todo) => todo.id === action.payload.id
    //     );
    //     console.log(index);
    //     state.todos[index] = action.payload;
    //   },
    //   prepare: (
    //     id: string,
    //     todo_name: string,
    //     completed: boolean,
    //     todo_description: string,
    //     date_modified: number
    //   ) => {
    //     console.log(id, todo_name, todo_description, completed, date_modified);
    //     return {
    //       payload: {
    //         id,
    //         todo_name,
    //         todo_description,
    //         completed,
    //         date_modified,
    //       },
    //     };
    //   },
    // },
        // removeTodo: {
    //   reducer: (state, action: PayloadAction<Todo>) => {
    //     state.todos.splice(
    //       state.todos.findIndex((todo: Todo) => todo.id === action.payload.id),
    //       1
    //     );
    //   },
    //   prepare: (todo: Todo) => {
    //     return { payload: todo };
    //   },
    // },
*/
