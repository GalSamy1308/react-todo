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
    const {searchedTodos, loading, error} = useSelector((state: RootState) => state.todoSlice);

    useEffect(() => {
        const loadTodos = async (retries = 10, delay = 2000) => {
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    dispatch(setLoading(true));
                    dispatch(setError(""));
                    const localTodos: TodoType[] = await fetchTodosApi()
                    dispatch(setStoreTodos(localTodos))
                    return "finished trying to load todos";
                } catch (err) {
                    if (attempt === retries) {
                        dispatch(setError("problem fetching todos"));
                    } else {
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                } finally {
                    dispatch(setLoading(false));
                }
            }
            return "finished trying to load todos";
        }
        loadTodos().then();
    }, [dispatch]);
    if (loading) {
        return <CircularProgress sx={{margin: '2rem auto', display: 'block'}}/>;
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
            {searchedTodos.map((todo) => (
                <Todo key={todo.id} {...todo} />
            ))}

        </Grid>
    )
}

export default TodosGrid;
