import React from 'react';
import { Container, CssBaseline, Paper, Typography } from '@material-ui/core';

const TemplatePage = ({ children }) => {
  return (
    <div>
      <CssBaseline />

      <Container component="main" maxWidth="lg" style={{ paddingTop: 64 }}>
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Typography component="div">
            {children}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default TemplatePage;