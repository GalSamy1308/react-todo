import React from 'react';
import {Typography} from "@mui/material";

function Header( ) {
    return (
            <Typography
                variant={'h2'}
                sx={{
                    m:1
                }}
            >
                To Do App
            </Typography>
    );
}

export default Header;
