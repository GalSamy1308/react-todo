import {Alert, CircularProgress, Grid} from '@mui/material';
import Todo from "./Todo";
import {useDispatch, useSelector} from "react-redux";
import TodoType from "../../types/TodoType";
import {RootState} from "../../store";
import {useEffect} from "react";
import {setError, setLoading, setStoreTodos} from "../../store/slices/TodoSlice";
import fetchTodosApi from '../../api/FetchTodosApi';

function TodosGrid() {
    const dispatch = useDispatch();
    const { todos, loading, error } = useSelector((state: RootState) => state.todoSlice);

    useEffect( () => {
        console.log("todo grid : use effect.")
            const loadTodos = async () => {
                try {
                    dispatch(setLoading(true));
                    dispatch(setError(""));
                    const localTodos: TodoType[] = await fetchTodosApi()
                    dispatch(setStoreTodos(localTodos))
                } catch (err) {
                    dispatch(setError("problem fetching todos"));
                } finally {
                    dispatch(setLoading(false));
                }
                return "finished trying to load todos";
            }
            loadTodos().then(r => console.log("r :" + r));

    }, [dispatch]);

    if (loading) {
        return <CircularProgress sx={{ margin: '2rem auto', display: 'block' }} />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Grid container spacing={2} sx={{
            padding: 1,
            margin: '0 auto',
            maxHeight: "80vh",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflowY: 'scroll',
            justifyContent: 'center',
            width: '100%'
        }}>
            {todos.map((todo) => (
                <Todo key={todo.id} {...todo} />
            ))}

        </Grid>
    )
}

export default TodosGrid;
