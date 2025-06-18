import TodoType from "../types/TodoType";

export default async function  postTodoApi(title : string, description: string) : Promise<TodoType | { error: string }>  {

        const response = await fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                completed: false,
            })
        })
        if (!response.ok) {
            const error = await response.json()
            return { error:  error.error };
        }
        return response.json();
}