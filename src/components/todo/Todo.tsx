import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Checkbox,
    TextField,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/DoneOutlineSharp';
import TodoType from '../../types/TodoType';
import {useDispatch} from 'react-redux';
import {deleteTodoFromStore, setCompletedTodo, updateStoreTodo} from '../../store/slices/TodoSlice';
import putTodo from '../../api/PutTodo';
import RemoveTodoModal from "../modals/RemoveTodoModal";
import deleteTodoApi from "../../api/DeleteTodoApi";

function Todo({id, title, description, completed}: TodoType) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(completed);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleToggleCompleted = async () => {
        const updated = !isCompleted;
        setIsCompleted(updated);
        const response: TodoType | { error: string } = await putTodo(editedTitle, editedDescription, updated, id);
        if ('error' in response) return console.error(response.error);
        dispatch(setCompletedTodo({id, completed: updated}));
    };

    const handleSaveEdit = async () => {
        setIsEditing(false);
        const response = await putTodo(editedTitle, editedDescription, isCompleted, id);
        if ('error' in response) return console.error(response.error);
        dispatch(updateStoreTodo({id, title: editedTitle, description: editedDescription, completed: isCompleted}));
    };

    const textFieldStyles = {
        width: '100%',
        mb: 1,
        '& .MuiInputBase-root': {
            padding: 0,
        },
        '& .MuiInputBase-inputMultiline': {
            padding: 0,
            fontSize: '1.2rem',
            lineHeight: 1.5,
            fontFamily: 'inherit',
        }
    };

    const typographyStyles = {
        textAlign: 'left',
        fontSize: '1.2rem',
        lineHeight: 1.5,
        mb: 1,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        fontFamily: 'inherit',
    };

    const renderEditFields = () => (
        <>
            <TextField
                multiline
                variant="outlined"
                sx={textFieldStyles}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Title"
            />
            <TextField
                multiline
                variant="outlined"
                color="secondary"
                sx={{
                    ...textFieldStyles,
                    '& .MuiInputBase-inputMultiline': {
                        ...textFieldStyles['& .MuiInputBase-inputMultiline'],
                        color: 'text.secondary'
                    }
                }}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Description"
            />
        </>
    );

    const renderReadFields = () => (
        <>
            <Typography
                component="div"
                sx={{
                    ...typographyStyles,
                    fontWeight: 500,
                }}
            >
                {editedTitle}
            </Typography>
            <Typography
                component="div"
                sx={{
                    ...typographyStyles,
                    color: 'text.secondary',
                    fontWeight: 400
                }}
            >
                {editedDescription}
            </Typography>
        </>
    );

    const onConfirmDelete = async () => {
        try {
            await deleteTodoApi(id);
            dispatch(deleteTodoFromStore(id));
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                maxHeight: '20rem',
                minWidth: "80%",
                maxWidth: "80%",
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                textDecoration: isCompleted ? 'line-through' : 'none'
            }}
        >
            <CardContent sx={{flexGrow: 1, display: 'flex', overflow: 'hidden',}}>
                <Checkbox checked={isCompleted} onChange={handleToggleCompleted}
                          sx={{alignSelf: 'flex-start', flexShrink: 0}}/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: "flex-start",
                    width: '100%',
                    ml: 1,
                    overflow: 'auto',
                }}>
                    {isEditing ? renderEditFields() : renderReadFields()}
                </Box>
            </CardContent>
            <CardActions>
                <IconButton size="small" color="primary"
                            onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}>
                    {isEditing ? <DoneIcon/> : <EditIcon/>}
                </IconButton>
                <IconButton size="small" color="error">
                    <RemoveTodoModal todoTitle={title} onConfirm={onConfirmDelete}></RemoveTodoModal>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Todo;