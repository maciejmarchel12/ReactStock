import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, IconButton  } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useTheme } from '../../contexts/themeContext';
import Settings from '../settings';

const Header = ({ settingsOpen, handleSettingsToggle }) => {
  const { isAuthenticated, permissionLevel, signout } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <AppBar position="fixed" style={{ top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: theme.palette.background.default }}>
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/inventoryPage" color="inherit">
          Inventory
        </Button>
        <Button component={Link} to="/addProductPage" color="inherit">
          Add Product
        </Button>

        {isAuthenticated && (permissionLevel === 'manager' || permissionLevel === 'admin') && (
          <Button component={Link} to="/signUpPage" color="inherit">
            Sign Up
          </Button>
        )}

        {isAuthenticated && (permissionLevel === 'manager' || permissionLevel === 'admin') && (
          <Button component={Link} to="/activityLogsPage" color="inherit">
            Activity Logs
          </Button>
        )}

        <Button component={Link} to="/UserPage" color="inherit">
          User Page
        </Button>

        {isAuthenticated ? (
          <>
            <IconButton onClick={handleSettingsToggle} color="inherit" style={{ marginLeft: 'auto' }}>
              <SettingsIcon />
            </IconButton>
            <Button onClick={signout} color='inherit'>
              Logout
            </Button>
          </>
        ) : (
            <Button component={Link} to="/LoginPage" color="inherit">
              Login
            </Button>
        )}
      </Toolbar>
      {settingsOpen && <Settings isOpen={settingsOpen} onClose={handleSettingsToggle} />}
    </AppBar>
  );
};

export default Header;
