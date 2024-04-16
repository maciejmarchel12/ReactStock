import React, { useState } from 'react';
import { TextField, MenuItem, Grid } from "@mui/material";
import { useTheme } from '../../contexts/themeContext';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root.Mui-focused': {
    borderColor: theme.palette.outline.main
  },

  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main
  },
  backgroundColor: theme.palette.field.main
}));

const UserFilters = ({ onSearch, onFilter }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const theme = useTheme();

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
            <CustomTextField
              label="Search by Username"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
              fullWidth
              theme={theme}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              select
              label="Filter by Permission Level"
              variant="outlined"
              value={filterValue}
              onChange={handleFilterChange}
              style={{ minWidth: '250px' }}
              theme={theme}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      );
    };

export default UserFilters;
