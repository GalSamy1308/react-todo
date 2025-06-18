
export default async function  deleteTodoApi(id:string) {

     await fetch('http://localhost:8080/todos/' + id, {
        method: 'DELETE',
    })
    return;
}