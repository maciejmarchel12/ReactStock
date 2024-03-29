import React, { useContext } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const Header = () => {
  const { isAuthenticated, permissionLevel, signout } = useContext(AuthContext);

  return (
    <AppBar position="static" style={{ top: 0, left: 0, right: 0, zIndex: 1000 }}>
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

        <Button component={Link} to="/UserPage" color="inherit">
          User Page
        </Button>
        {isAuthenticated  ? (
          <Button onClick={signout} color='inherit' style={{ marginLeft: 'auto'}}>
            Logout
          </Button>
        ) : (
          <>
        <Button component={Link} to="/LoginPage" color="inherit">
          Login
        </Button>
        </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;