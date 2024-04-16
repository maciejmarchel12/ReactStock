import React, { useState, useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Snackbar } from "@mui/material";
import { useTheme } from '../contexts/themeContext';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root.Mui-focused': {
    borderColor: theme.palette.outline.main
  },

  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main
  },
  backgroundColor: theme.palette.field.main
}));

const LoginPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const theme = useTheme();

    const login = async () => {
        try {
            await context.authenticate(userName, password);
        } catch (error) {
            setError(error.message || "An error occurred during login.");
            setUserName(""); // Clear input fields on error
            setPassword(""); // Clear input fields on error
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    if (context.isAuthenticated) {
        return <Navigate to={from} />;
    }

    return (
        <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, paddingTop: 20 }}>
                <Typography component="h2" variant="h5">
                    Login page
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        theme={theme}
                    />
                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        theme={theme}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: theme.palette.primary.main }}
                        onClick={login}
                    >
                        Log in
                    </Button>
                </Box>
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={handleCloseError}
                    message={error}
                />
            </Container>
        </div>
    );
};

export default LoginPage;
