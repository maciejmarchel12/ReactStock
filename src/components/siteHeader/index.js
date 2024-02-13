import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;