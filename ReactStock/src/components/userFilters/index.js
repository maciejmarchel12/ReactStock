import React, { useState } from 'react';
import { TextField, MenuItem, Grid } from "@mui/material";

const UserFilters = ({ onSearch, onFilter }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        onSearch(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
        onFilter(event.target.value);
    };

    return (
        <Grid container spacing={2} alignItems="center" style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search by Username"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Filter by Permission Level"
              variant="outlined"
              value={filterValue}
              onChange={handleFilterChange}
              style={{ minWidth: '250px' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      );
    };

export default UserFilters;
