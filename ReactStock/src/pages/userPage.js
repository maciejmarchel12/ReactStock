import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Container, Typography, Card, CardContent, Avatar, Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  card: {
    minWidth: 275,
    maxWidth: 300,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  highlightCard: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const UserPage = () => {
  const classes = useStyles(); // Use makeStyles hook to access styles
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
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id}>
            <Card className={`${classes.card} ${user.username === userName && classes.highlightCard}`}>
              <CardContent>
                <Avatar className={classes.avatar}>{user.username.charAt(0).toUpperCase()}</Avatar>
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