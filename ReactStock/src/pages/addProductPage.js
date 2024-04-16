import React from 'react';
import ProductForm from '../components/productForm';
import { useTheme } from '../contexts/themeContext';

const AddProductPage = ({ onAddProduct }) => {

        const initialValues = {
        productName: '',
        image: '',
        productType: '',
        barcode: '',
        amountAvailable: '',
        storeLocation: ''
    };

    const theme = useTheme();

    console.log('onAddProduct:', typeof onAddProduct);
    console.log('Rendering AddProductPage');
  return (
    <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ProductForm initialValues={initialValues} onSubmit={onAddProduct} />
    </div>
  );
};

export default AddProductPage;