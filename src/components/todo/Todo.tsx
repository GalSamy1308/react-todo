import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import {deleteTodoFromStore, setCompletedTodo, updateStoreTodo} from '../../store/slices/TodoSlice';
import putTodo from '../../api/PutTodo';
import RemoveTodoModal from "../modals/RemoveTodoModal";
import deleteTodoApi from "../../api/DeleteTodoApi";

function Todo({id, title, description, completed} : TodoType) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(completed);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleToggleCompleted = async () => {
        const updated = !isCompleted;
        setIsCompleted(updated);

        const response = await putTodo(editedTitle, editedDescription, updated, id);
        if ('error' in response) return console.error(response.error);

        dispatch(setCompletedTodo({ id, completed: updated }));
    };

    const handleSaveEdit = async () => {
        setIsEditing(false);

        const response = await putTodo(editedTitle, editedDescription, isCompleted, id);
        if ('error' in response) return console.error(response.error);

        dispatch(updateStoreTodo({ id, title: editedTitle, description: editedDescription, completed: isCompleted }));
    };

    const renderEditFields = () => (
        <>
            <TextField
                size="small"
                multiline
                variant="outlined"
                sx={{ mb: 1 }}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
                size="small"
                multiline
                variant="outlined"
                color="secondary"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
            />
        </>
    );

    const renderReadFields = () => (
        <>
            <Typography variant="h6" sx={{ mb: 1 }}>
                {editedTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {editedDescription}
            </Typography>
        </>
    );

    const onConfirmDelete = async () => {
        try {
            console.log('Deleting todo with id:', id);
            await deleteTodoApi(id);
            console.log("deleted todo from server");
            dispatch(deleteTodoFromStore(id));
        } catch (error) {
            console.error("Failed to delete todo:", error);

        }
    };


    return (
        <Card
            sx={{
                height: '100%',
                minWidth: "80%",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                textDecoration: isCompleted ? 'line-through' : 'none'
            }}
        >
            <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox checked={isCompleted} onChange={handleToggleCompleted} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start"}}>
                    {isEditing ? renderEditFields() : renderReadFields()}
                </Box>
            </CardContent>
            <CardActions>
                <IconButton size="small" color="primary" onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}>
                    {isEditing ? <DoneIcon /> : <EditIcon />}
                </IconButton>
                <IconButton size="small" color="error">
                    <RemoveTodoModal todoTitle={title} onConfirm={onConfirmDelete}></RemoveTodoModal>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Todo;
