import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TodoState from "../../types/TodoState";
import TodoType from "../../types/TodoType";

const initialState : TodoState = {
    todos: [],
    loading: false,
    error: null,
}

 const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addStoreTodo: (state, action : PayloadAction<TodoType>) => {
            state.todos.push(action.payload); // "Mutative" but actually immutable!
        },
        setStoreTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.todos = action.payload;
        },
        setCompletedTodo: (state, action: PayloadAction<{id:string,completed:boolean}>) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = action.payload.completed;
            }
        },
        updateStoreTodo: (state, action: PayloadAction<TodoType>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
        deleteTodoFromStore: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    }
});
export default todoSlice.reducer;
export const { addStoreTodo,setStoreTodos, setError,setLoading,setCompletedTodo,updateStoreTodo,deleteTodoFromStore } = todoSlice.actions;