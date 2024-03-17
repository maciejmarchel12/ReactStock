import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddProductPage from '../../pages/addProductPage';
import InventoryPage from '../../pages/inventoryPage';

const ProductManager = () => {
  const [inventory, setInventory] = useState([]);

  const handleAddProduct = (newProduct) => {
    // Update the inventory state with the new product
    setInventory((prevInventory) => [...prevInventory, newProduct]);
  };

  return (
    <Routes>
      <Route
        path="/addProductPage"
        element={<AddProductPage onAddProduct={handleAddProduct} />}
      />
      <Route
        path="/inventoryPage"
        element={<InventoryPage inventory={inventory} />}
      />
      <Route path="*" element={<Navigate to="/addProductPage" />} />
    </Routes>
  );
};

export default ProductManager;