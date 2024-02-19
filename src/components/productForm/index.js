import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductForm = ({ onAddProduct }) => {
  console.log('onAddProduct:', onAddProduct);
  const [formData, setFormData] = useState({
    productName: '',
    image: '',
    productType: '',
    barcode: '',
    amountAvailable: 0,
    storeLocation: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onAddProduct prop with the form data
    onAddProduct(formData);
    // Optional: Reset the form after submission
    setFormData({
      productName: '',
      image: '',
      productType: '',
      barcode: '',
      amountAvailable: 0,
      storeLocation: '',
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={5}
    >
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
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
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;