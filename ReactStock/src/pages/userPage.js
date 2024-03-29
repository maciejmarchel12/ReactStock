import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { deleteUser, fetchUsers } from '../api/reactStock-backend';
import { Container, Typography, Card, CardContent, Avatar, Grid, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import UserFilters from '../components/userFilters';

const UserPage = () => {
  const { isAuthenticated, permissionLevel } = useContext(AuthContext);
  const { userName } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); //State for controlling the pop-up snackbar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(); // Use fetchUsers function to fetch users
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        setUsers(users.filter(user => user._id !== userId));
        setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
        setSnackbarOpen(true); //Show the pop after successful deletion
      } else {
        console.error('Error deleting user:', response.msg);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
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
    <Container maxWidth="lg" style={{ marginTop: '24px' }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <UserFilters onSearch={handleSearch} onFilter={handleFilter} />
      <Grid container spacing={2} justifyContent="flex-start">
        {filteredUsers.map((user) => (
          <Grid item key={user._id}>
            <Card style={{ minWidth: '275px', maxWidth: '300px', marginRight: '16px', marginBottom: '16px', backgroundColor: user.username === userName ? '#1976d2' : '', color: user.username === userName ? '#fff' : '' }}>
              <CardContent>
                <Avatar style={{ backgroundColor: user.username === userName ? '#fff' : '#1976d2', color: user.username === userName ? '#1976d2' : '#fff', width: '56px', height: '56px' }}>{user.username.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="h6" component="h2">
                  {user.username}
                </Typography>
                {/* Permission Level */}
                {isAuthenticated && (permissionLevel === 'admin' || permissionLevel === 'manager') && (
                  <>
                    {/* Edit button */}
                    <Button variant="outlined" onClick={() => handleEditUser(user._id)}>Edit</Button>
                    {/* Delete button */}
                    <Button variant="outlined" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Snackbar for successful deletion */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          User deleted successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default UserPage;