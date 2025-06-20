import React, {useEffect, useState} from 'react';
import {Modal, Box, Button, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from 'react-redux';
import {addStoreTodo} from '../../store/slices/TodoSlice';
import postTodoApi from "../../api/PostTodoApi";
import ActionPopup from "../popups/ActionPopup";

function AddTodoModal() {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [isErrorPopupVisible, setErrorPopupVisible] = useState(false);
    const [isSuccessPopupVisible, setSuccessPopupVisible] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    async function handleAddTodo(): Promise<void> {
        if (!title || !description) {
            console.log(isErrorPopupVisible);
            setErrorMessage("Please fill in all fields");
            return setErrorPopupVisible(true);
        }

        const response = await postTodoApi(title, description)
        if ("error" in response) {
            setErrorMessage(response.error);
            return setErrorPopupVisible(true);
        }

        dispatch(addStoreTodo({title, description, completed: false, id: response.id}));
        setTitle("");
        setDescription("");
        setSuccessPopupVisible(true);
        handleClose();
    }

    function handleErrorPopupClose() {
        setErrorPopupVisible(false);
    }

    function handleSuccessPopupClose() {
        setSuccessPopupVisible(false);
    }

    useEffect(() => {
    }, [isErrorPopupVisible, isSuccessPopupVisible]);
    return (
        <>
            {isSuccessPopupVisible &&
                <ActionPopup
                    open={isSuccessPopupVisible}
                    upperOnClose={handleSuccessPopupClose}
                    message={"Successfully created a todo!"}
                    severity={"success"}
                />
            }
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                <AddIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxWidth: '80%',
                    maxHeight: '80%',
                }}>
                    <Typography id="modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                        Add New Todo
                    </Typography>
                    <TextField
                        fullWidth
                        label="Title"
                        margin="normal"
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        margin="normal"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddTodo()}
                    >
                        Add Todo
                    </Button>
                </Box>
            </Modal>
            {isErrorPopupVisible &&
                <ActionPopup
                    open={isErrorPopupVisible}
                    upperOnClose={handleErrorPopupClose}
                    severity={"error"}  message={errorMessage}
                />
            }
        </>
    );
}

export default AddTodoModal;