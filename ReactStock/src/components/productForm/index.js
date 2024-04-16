import React, { useState } from 'react';
import { createProduct, updateProductById } from '../../api/reactStock-backend';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root.Mui-focused': {
    borderColor: theme.palette.outline.main,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main,
  },
  backgroundColor: theme.palette.field.main,
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputLabel-root.Mui-focused': {
    borderColor: theme.palette.outline.main,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.outline.main,
  },
  backgroundColor: theme.palette.field.main,
}));

const ProductForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (initialValues._id) {
        await updateProductById(initialValues._id, formData);
      } else {
        await createProduct(formData);
      }
      onSubmit(); // Notify parent component about successful submission
      navigate('/inventoryPage')
    } catch (error) {
      console.error('Error submitting product form:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} style={{ paddingTop: 64 }}>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <CustomTextField
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            theme={theme}
          />
        </Box>
        <Box mb={2}>
          <CustomTextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            theme={theme}
          />
        </Box>
        <Box mb={2}>
          <CustomTextField
            label="Product Type"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
            theme={theme}
          />
        </Box>
        <Box mb={2}>
          <CustomTextField
            label="Barcode"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            required
            theme={theme}
          />
        </Box>
        <Box mb={2}>
          <CustomTextField
            label="Amount Available"
            name="amountAvailable"
            type="number"
            value={formData.amountAvailable}
            onChange={handleChange}
            required
            theme={theme}
          />
        </Box>
        <Box mb={2}>
          <CustomFormControl fullWidth theme={theme}>
            <InputLabel id="store-location-label">Store Location</InputLabel>
            <CustomSelect
              labelId="store-location-label"
              id="store-location-select"
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleChange}
              required
              theme={theme}
            >
              <MenuItem value="OnSite">OnSite</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </CustomSelect>
          </CustomFormControl>
        </Box>
        <Button type="submit" variant="contained" style={{backgroundColor: theme.palette.primary.main }}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;