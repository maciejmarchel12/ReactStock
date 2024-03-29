import React, { useState } from 'react';
import { TextField, MenuItem, Grid } from "@mui/material";

const ProductFilters = ({ onSearch, onFilter }) => {
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
          label="Search by Product Name, Barcode, or Type"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Filter by Store Location"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="OnSite">OnSite</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ProductFilters;