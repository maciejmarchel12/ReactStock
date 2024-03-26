import React, { useState } from 'react';
import InventoryCard from '../components/inventoryCard';
import ProductForm from '../components/productForm';
//import { AuthContext } from '../contexts/authContext';

const InventoryPage = ({ inventory }) => {
  const [inventoryList, setInventoryList] = useState(inventory);
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (id) => {
    setInventoryList(prevInventory =>
      prevInventory.filter(item => item.id !== id)
    );
  };

  const handleSubmitForm = (formData) => {
    if (editItem) {
      // Update existing item in the inventoryList
      const updatedList = inventoryList.map(item => {
        if (item.id === editItem.id) {
          return { ...item, ...formData };
        }
        return item;
      });
      setInventoryList(updatedList);
      setEditItem(null);
    } else {
      // If there is no editItem, it means a new item is being added
      // Generate unique ID for new item
      const id = Math.random().toString(36).substring(7);
      const newItem = { id, ...formData };
      setInventoryList(prevInventory => [...prevInventory, newItem]); // Add new item to inventoryList
    }
  };

  return (
    <div>
      {editItem ? (
        <ProductForm initialValues={editItem} onSubmit={handleSubmitForm} />
      ) : (
        inventoryList.map((product) => (
          <InventoryCard
            key={product.id}
            {...product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default InventoryPage;

// OLD
// const InventoryPage = ({ inventory }) => {
//   const { isAuthenticated, permissionLevel } = useContext(AuthContext);

//   return (
//     <div>
//       {inventory && inventory.map((product, index) => (
//         <InventoryCard key={index}
//         {...product}
//          isAuthenticated={isAuthenticated}
//          permissionLevel={permissionLevel}
//          />
//       ))}
//     </div>
//   );
// };

// export default InventoryPage;