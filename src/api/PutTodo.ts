import TodoType from "../types/TodoType";

export default async function  updateTodoApi(title : string, description: string, completed:boolean, id:string) : Promise<TodoType | { error: string }>  {

    const response = await fetch('http://localhost:8080/todos/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: completed,
        })
    })
    if (!response.ok) {
        const error = await response.json()
        return { error:  error.error };
    }
    return response.json();
}