import React, { useState, useEffect } from 'react';
import { getAllActivityLogs, deleteActivityLogById } from '../api/reactStock-backend';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const ActivityLogsPage = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // Flags to indicate if request is in progress

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
    try {
      await deleteActivityLogById(id);
      setActivityLogs((prevLogs) => prevLogs.filter(log => log._id !== id));
    } catch (error) {
      console.error('Error deleting activity log:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '24px', paddingTop: 64, paddingBottom: 64, overflowY: 'scroll' }}>
      <h1>Activity Logs</h1>
      <Grid container spacing={3}>
        {activityLogs.map((log) => (
          <Grid item xs={12} key={log._id}>
            <Card>
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
                <Button variant="contained" color="error" onClick={() => handleDeleteActivityLog(log._id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActivityLogsPage;