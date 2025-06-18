import TodoType from "./TodoType";

interface TodoState {
    todos: TodoType[],
    loading: boolean,
    error: string | null,
}
export default TodoState;