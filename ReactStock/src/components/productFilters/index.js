import React from 'react';
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

const ProductFilters = ({ onSearch, onFilter, classes}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filterValue, setFilterValue] = React.useState('');
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
      <Grid item xs={12} sm={4}>
        <CustomTextField
          label="Search by Product Name, Barcode, or Type"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          fullWidth
          theme={theme}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CustomTextField
          select
          label="Filter by Store Location"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
          fullWidth
          theme={theme}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="OnSite">OnSite</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
        </CustomTextField>
      </Grid>
    </Grid>
  );
};

export default ProductFilters;