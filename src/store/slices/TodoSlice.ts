import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TodoState from "../../types/TodoState";
import TodoType from "../../types/TodoType";

const initialState: TodoState = {
    todos: [],
    searchedTodos: [],
    searchedTerm: '',
    loading: false,
    error: null,
}

const filterTodosByQuery = (todos: TodoType[], query: string): TodoType[] => {
    if (!query.trim()) {
        return todos;
    }
    const lowerQuery = query.toLowerCase();
    return todos.filter(todo =>
        todo.title.toLowerCase().includes(lowerQuery) ||
        todo.description.toLowerCase().includes(lowerQuery)
    );
};


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
        addStoreTodo: (state, action: PayloadAction<TodoType>) => {
            state.todos.push(action.payload);
            state.searchedTodos = filterTodosByQuery(state.todos, state.searchedTerm);// "Mutative" but actually immutable!
        },
        setStoreTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.todos = action.payload;
            state.searchedTodos = filterTodosByQuery(state.todos, state.searchedTerm)
        },
        setCompletedTodo: (state, action: PayloadAction<{ id: string, completed: boolean }>) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = action.payload.completed;
            }
            const searchedTodo = state.searchedTodos.find(todo => todo.id === action.payload.id);
            if (searchedTodo) {
                searchedTodo.completed = action.payload.completed;
            }

        },
        updateStoreTodo: (state, action: PayloadAction<TodoType>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
            state.searchedTodos = filterTodosByQuery(state.todos, state.searchedTerm);

        },
        deleteTodoFromStore: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.searchedTodos = state.searchedTodos.filter(todo => todo.id !== action.payload);
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchedTerm = action.payload;
            state.searchedTodos = filterTodosByQuery(state.todos, action.payload);
        },


    }
});
export default todoSlice.reducer;
export const {
    addStoreTodo,
    setStoreTodos,
    setError,
    setLoading,
    setCompletedTodo,
    updateStoreTodo,
    deleteTodoFromStore,
    setSearchQuery
} = todoSlice.actions;