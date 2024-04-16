import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Container, Typography, TextField, Button, Box, Snackbar, MenuItem } from "@mui/material";
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

console.log('Rendering SignUp');

const SignUpPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [permissionLevel, setPermissionLevel] = useState("employee"); // Default permission level
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();

    const register = async () => {
        try {
            let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            const validPassword = passwordRegEx.test(password);

            if (!validPassword) {
                setError("Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.");
                return;
            }

            if (password !== passwordAgain) {
                setError("Passwords do not match. Please enter the same password in both fields.");
                return;
            }

            const success = await context.register(userName, password, permissionLevel);
            if (success) {
                setRegistered(true);
            } else {
                setError("Registration failed. Please try again later.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Registration failed. Please try again later.");
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    if (registered === true) {
        return <Navigate to="/LoginPage" />;
    }

    // Return SignUp Form

    return (
        <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, paddingTop: 20 }}>
            <Typography component="h2" variant="h5">
                SignUp page
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
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
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
                    autoComplete="new-password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    theme={theme}
                />
                <CustomTextField
                    margin="normal"
                    required
                    fullWidth
                    name="passwordAgain"
                    label="Password Again"
                    type="password"
                    id="passwordAgain"
                    autoComplete="new-password"
                    value={passwordAgain}
                    onChange={e => {
                        setPasswordAgain(e.target.value);
                    }}
                    theme={theme}
                />
                {/* Dropdown for permission level */}
                <CustomTextField
                    select
                    fullWidth
                    margin="normal"
                    label="Permission Level"
                    value={permissionLevel}
                    onChange={e => setPermissionLevel(e.target.value)}
                    theme={theme}
                >
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </CustomTextField>
                <Button
                    fullWidth
                    variant="contained"
                    style={{backgroundColor: theme.palette.primary.main }}
                    onClick={register}
                >
                    Register
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

export default SignUpPage;