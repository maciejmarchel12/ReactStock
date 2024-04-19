import React, { useState, useEffect } from 'react';
import { getAllActivityLogs, deleteActivityLogById } from '../api/reactStock-backend';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useTheme } from '../contexts/themeContext';

const ActivityLogsPage = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // Flags to indicate if request is in progress
  const theme = useTheme();

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    // Checks to see if request is already in progress
    if (isFetching) return;

    try {
      setIsFetching(true); // Sets the flag to indicate request start
      const logs = await getAllActivityLogs();
      setActivityLogs(logs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setIsFetching(false); // Resets the flag when request is completed
    }
  };

  const handleDeleteActivityLog = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this activity log?');
    if (confirmDelete) {
      try {
        await deleteActivityLogById(id);
        setActivityLogs((prevLogs) => prevLogs.filter(log => log._id !== id));
      } catch (error) {
        console.error('Error deleting activity log:', error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md" style={{ marginTop: '24px', paddingTop: 64, paddingBottom: 106 }}>
        <h1>Activity Logs</h1>
        <Grid container spacing={3}>
          {activityLogs.reverse().map((log) => (
            <Grid item xs={12} key={log._id}>
              <Card style={{ backgroundColor: theme.palette.field.main}}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Action: {log.action}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {log.username ? `User: ${log.username}` : 'User: Unknown'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Timestamp: {new Date(log.timestamp).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {log.details ? `Details: ${log.details}` : 'Details: No details available'}
                  </Typography>
                  <Button variant="contained" style={{ backgroundColor: theme.palette.primary.main }} onClick={() => handleDeleteActivityLog(log._id)}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ActivityLogsPage;