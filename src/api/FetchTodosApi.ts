import TodoType from "../types/TodoType";

async function fetchTodosApi() : Promise<TodoType[]>{
    const response = await fetch('http://localhost:8080/todos', {
        method: 'GET'
    })
    return response.json();
}
export default fetchTodosApi;

