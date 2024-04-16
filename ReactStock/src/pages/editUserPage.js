import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../api/reactStock-backend";
import { AuthContext } from '../contexts/authContext';
import { Container, Typography, TextField, Button, Box, Snackbar, MenuItem } from "@mui/material";
import { useTheme } from "../contexts/themeContext";
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

const EditUserPage = () => {
    const { userId } = useParams(); // Assuming you're using React Router to get the userId from the URL
    const { isAuthenticated } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [permissionLevel, setPermissionLevel] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        //Fetch the user details when the component is mounted
        const fetchUserDetails = async () => {
            try {
                const user = await getUserById(userId);
                setUserName(user.username);
                setPermissionLevel(user.permissionLevel);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Error fetching user details. Please try again later.");
            }
        };

        fetchUserDetails();
    }, [userId]); // Fetch details when userId changes

    const handleUpdateUser = async () => {
        try {
            const userData = {
                username: userName,
                password: password ? password : undefined, // Only include password if it's being updated
                permissionLevel: permissionLevel
            };
    
            const response = await updateUser(userId, userData);
            if (response.success) {
                navigate('/UserPage')
            } else {
                setError(response.msg);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error updating user. Please try again later.");
        }
    };

    // Return EditUser Form

    return (
        <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, paddingTop: 20 }}>
            <Typography component="h2" variant="h5">
                Edit User
            </Typography>
            {/* Form for editing user details */}
            <Box component="form" sx={{ mt: 1 }}>
                {/* Text field for username */}
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
                {/* Text field for password */}
                <CustomTextField
                    margin="normal"
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
                {/* Button to update user */}
                <Button
                    fullWidth
                    variant="contained"
                    style={{backgroundColor: theme.palette.primary.main }}
                    onClick={handleUpdateUser}
                >
                    Update User
                </Button>
            </Box>
            {/* Error Snackbar */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                message={error}
            />
        </Container>
        </div>
    );
};

export default EditUserPage;