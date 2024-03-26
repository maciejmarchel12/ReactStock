import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddProductPage from '../../pages/addProductPage';
import InventoryPage from '../../pages/inventoryPage';

const ProductManager = () => {
  const [inventory, setInventory] = useState([]);
  const [lastUsedId, setLastUsedId] = useState(0); // Initialize last used ID

  const handleAddProduct = (newProduct) => {
    // Increments last used ID by 1 for the new product
    const newId = lastUsedId + 1;
    newProduct.id = newId;
    // Updates the inventory state with the new product
    setInventory((prevInventory) => [...prevInventory, newProduct]);
    // Updates the last used ID
    setLastUsedId(newId);
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