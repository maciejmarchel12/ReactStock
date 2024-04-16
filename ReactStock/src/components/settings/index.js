import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTheme, useThemeUpdate } from '../../contexts/themeContext'; // Ensure correct import

const Settings = ({ isOpen, onClose }) => {
    const theme = useTheme();
    const toggleTheme = useThemeUpdate();
  
    useEffect(() => {
      console.log('Theme changed:', theme.palette.mode);
    }, [theme]);
  
    const handleToggleTheme = () => {
      console.log('Toggle button clicked');
      toggleTheme();
    };
  
    return (
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <div style={{ width: 300 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <List>
            <ListItem button onClick={handleToggleTheme}>
              <ListItemText primary={`Toggle ${theme.palette.mode === 'light' ? 'Dark' : 'Light'} Theme`} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  };

export default Settings;
