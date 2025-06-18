import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SuccessPopupProps {
    open: boolean;
    upperOnClose : () => void;
    message: string;
}
function AddSuccessPopup(props: SuccessPopupProps) {
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
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddSuccessPopup;