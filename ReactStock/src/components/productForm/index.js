import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    navigate('/inventoryPage');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            id="productName" // Add id attribute
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="image" // Add id attribute
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Product Type"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Barcode"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Amount Available"
            name="amountAvailable"
            type="number"
            value={formData.amountAvailable}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Store Location"
            name="storeLocation"
            value={formData.storeLocation}
            onChange={handleChange}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;