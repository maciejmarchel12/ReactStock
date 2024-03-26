import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Container, Typography, Card, CardContent, Avatar, Grid } from "@mui/material";

const UserPage = () => {
  const { userName } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users data from the backend API
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '24px' }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id}>
            <Card style={{ minWidth: '275px', maxWidth: '300px', marginRight: '16px', marginBottom: '16px', backgroundColor: user.username === userName ? '#1976d2' : '', color: user.username === userName ? '#fff' : '' }}>
              <CardContent>
                <Avatar style={{ backgroundColor: user.username === userName ? '#fff' : '#1976d2', color: user.username === userName ? '#1976d2' : '#fff', width: '56px', height: '56px' }}>{user.username.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="h6" component="h2">
                  {user.username}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserPage;