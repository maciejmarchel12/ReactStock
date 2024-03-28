import React, { useState, useEffect } from 'react';
import InventoryCard from '../components/inventoryCard';
import ProductForm from '../components/productForm';
import { getAllProducts, deleteProductById } from '../api/reactStock-backend';
//import { AuthContext } from '../contexts/authContext';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []); // Fetch inventory on component mount

  const fetchInventory = async () => {
    try {
      const products = await getAllProducts();
      setInventory(products);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductById(id);
      setInventory((prevInventory) => prevInventory.filter(item => item.id !== id));
      await fetchInventory();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmitForm = async () => {
    try {
        // Reload inventory after form submission
        await fetchInventory();
        setEditItem(null);
    } catch (error) {
        console.error('Error handling form submission:', error);
    }
};

  return (
    <div>
      {editItem ? (
        <ProductForm initialValues={editItem} onSubmit={handleSubmitForm} />
      ) : (
        inventory.map((product) => (
          <InventoryCard
            key={product._id} // Ensure each InventoryCard has a unique key
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