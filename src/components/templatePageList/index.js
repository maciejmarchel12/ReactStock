import React from 'react';
import { Container, CssBaseline, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const TemplatePageList = ({ title, items }) => {
  return (
    <div>
      <CssBaseline />

      <Container component="main" maxWidth="lg">
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          {items.length ? (
            <List>
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                  {/* add more details or actions here */}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No items in the inventory.</Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default TemplatePageList;