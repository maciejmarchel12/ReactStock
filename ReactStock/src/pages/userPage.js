import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { deleteUser, fetchUsers } from '../api/reactStock-backend';
import { Container, Typography, Card, CardContent, Avatar, Grid, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import UserFilters from '../components/userFilters';
import { useTheme } from '../contexts/themeContext';

const UserPage = () => {
  const { isAuthenticated, permissionLevel } = useContext(AuthContext);
  const { userName } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); //State for controlling the pop-up snackbar
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(); // Use fetchUsers function to fetch users
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage("Error fetching users. Please try again later.");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, []);

  const handleEditUser = (userId) => {
    // Prevent managers from editing admin users
    if (permissionLevel === 'manager' && users.find(user => user._id === userId)?.permissionLevel === 'admin') {
        setErrorMessage("Permission denied. Managers cannot edit admin users.");
        setSnackbarOpen(true)
        return;
    }
    navigate(`/edit-user/${userId}`);
};

const handleDeleteUser = async (userId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this user?');
  if (confirmDelete) {
      try {
          const userToDelete = users.find(user => user._id === userId);
          // Checks if the logged-in user is a manager and the user to delete is an admin
          if (permissionLevel === 'manager' && userToDelete.permissionLevel === 'admin') {
              setErrorMessage("Permission denied. Managers cannot delete admin users.");
              setSnackbarOpen(true);
              return;
          }
          const response = await deleteUser(userId);
          if (response.success) {
              setUsers(users.filter(user => user._id !== userId));
              setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
              setSnackbarOpen(true); // Show the pop after successful deletion
          } else {
              setErrorMessage(`Error deleting user: ${response.msg}`);
              setSnackbarOpen(true);
          }
      } catch (error) {
          console.error('Error deleting user:', error);
          setErrorMessage("Error deleting user. Please try again later.");
          setSnackbarOpen(true);
      }
  }
};

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
    setErrorMessage("");
  };

  const handleSearch = (searchValue) => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleFilter = (filterValue) => {
    if (filterValue === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.permissionLevel === filterValue);
      setFilteredUsers(filtered);
    }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="xl" style={{ marginTop: '24px', paddingTop: 64 }}>
            <Typography variant="h4" gutterBottom>
                User Dashboard
            </Typography>
            <UserFilters onSearch={handleSearch} onFilter={handleFilter} />
            <Grid container spacing={2} justifyContent="flex-start">
                {filteredUsers.map((user) => (
                    <Grid item key={user._id}>
                        <Card style={{ minWidth: '275px', maxWidth: '300px', marginRight: '16px', marginBottom: '16px', backgroundColor: user.username === userName ? '#1976d2' : theme.palette.field.main, color: user.username === userName ? '#fff' : '' }}>
                            <CardContent>
                                <Avatar style={{ backgroundColor: user.username === userName ? '#fff' : '#1976d2', color: user.username === userName ? '#1976d2' : '#fff', width: '56px', height: '56px' }}>{user.username.charAt(0).toUpperCase()}</Avatar>
                                <Typography variant="h6" component="h2">
                                    {user.username}
                                </Typography>
                                {/* Permission Level */}
                                {isAuthenticated && (permissionLevel === 'admin' || permissionLevel === 'manager') && (
                                    <>
                                        {/* Edit button */}
                                        <Button variant="contained" style={{ backgroundColor: theme.palette.primary.main }} onClick={() => handleEditUser(user._id)}>Edit</Button>
                                        {/* Delete button */}
                                        <Button variant="contained" style={{ backgroundColor: theme.palette.secondary.main }} onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* Snackbar for error messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    </div>
);
};

export default UserPage;