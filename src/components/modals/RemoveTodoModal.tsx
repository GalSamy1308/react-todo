import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface RemoveTodoModalProps {
    todoTitle: string;
    onConfirm: () => void;
}

function RemoveTodoModal({todoTitle, onConfirm}: RemoveTodoModalProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <>
            <IconButton size="small" color="error" onClick={() => setOpen(true)}>
                <DeleteIcon/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete "{todoTitle}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleConfirm}
                        color="error"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RemoveTodoModal;