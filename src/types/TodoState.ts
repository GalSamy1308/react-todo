import TodoType from "./TodoType";

interface TodoState {
    todos: TodoType[],
    searchedTodos: TodoType[],
    searchedTerm: string,
    loading: boolean,
    error: string | null,
}
export default TodoState;