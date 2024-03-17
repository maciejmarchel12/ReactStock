import React from 'react';
import InventoryCard from '../components/inventoryCard';

const InventoryPage = ({ inventory }) => {
  return (
    <div>
      {inventory && inventory.map((product, index) => (
        <InventoryCard key={index} {...product} />
      ))}
    </div>
  );
};

export default InventoryPage;