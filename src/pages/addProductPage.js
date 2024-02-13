import React from 'react';
import ProductForm from '../components/productForm';

const AddProductPage = ({ onAddProduct }) => {
    console.log('onAddProduct:', typeof onAddProduct);
    console.log('Rendering AddProductPage');
  return (
    <div>
      <ProductForm onAddProduct={onAddProduct} />
    </div>
  );
};

export default AddProductPage;