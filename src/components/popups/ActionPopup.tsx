import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface TodoPopupProps {
    open: boolean;
    upperOnClose : () => void;
    message: string;
    severity: "success" | "info" | "warning" | "error" | undefined;
}
function ActionPopup(props: TodoPopupProps) {
    const [open, setOpen] = React.useState(false);
    const handleClose = (_: any, reason?: string) => {
        props.upperOnClose();
        if (reason === 'clickaway') return;
        setOpen(false);
    };
    console.log("AddErrorPopup open:", open); // debug print

    return (

        <>
            <Snackbar open={true} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ActionPopup;