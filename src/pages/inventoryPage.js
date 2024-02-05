import React from 'react';
import TemplatePageList from '../components/templatePageList';

const inventoryItems = [
  { name: 'Item 1', quantity: 10 },
  { name: 'Item 2', quantity: 5 },
  // Add more items to test
];

const InventoryPage = () => {
  return (
    <TemplatePageList title="Inventory" items={inventoryItems} />
  );
};

export default InventoryPage;