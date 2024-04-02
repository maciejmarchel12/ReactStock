import React, { useState } from 'react';
import { Button, Snackbar } from "@mui/material";

const SubtractModeSwitch = ({ isSubtractMode, setIsSubtractMode }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleToggleSubtractMode = () => {
        setIsSubtractMode(!isSubtractMode);
        setSnackbarOpen(true);
        console.log('Toggle subtract mode:', !isSubtractMode); // Check toggle
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={handleToggleSubtractMode}>
                {isSubtractMode ? "Disable Subtract Mode" : "Enable Subtract Mode"}
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={isSubtractMode ? "Subtract Mode Enabled" : "Subtract Mode Disabled"}
            />
        </>
    );
};

export default SubtractModeSwitch;