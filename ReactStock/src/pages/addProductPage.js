import React from 'react';
import ProductForm from '../components/productForm';

const AddProductPage = ({ onAddProduct }) => {

        const initialValues = {
        productName: '',
        image: '',
        productType: '',
        barcode: '',
        amountAvailable: '',
        storeLocation: ''
    };

    console.log('onAddProduct:', typeof onAddProduct);
    console.log('Rendering AddProductPage');
  return (
    <div>
      <ProductForm initialValues={initialValues} onSubmit={onAddProduct} />
    </div>
  );
};

export default AddProductPage;