import React, { useState, useEffect } from 'react';
import InventoryCard from '../components/inventoryCard';
import ProductForm from '../components/productForm';
import ProductFilters from '../components/productFilters';
import { getAllProducts, deleteProductById } from '../api/reactStock-backend';
import { Grid, Container} from "@mui/material";
//import { AuthContext } from '../contexts/authContext';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []); // Fetch inventory on component mount

  const fetchInventory = async () => {
    try {
      const products = await getAllProducts();
      setInventory(products);
      setFilteredInventory(products);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleSearch = (value) => {
    const filteredProducts = inventory.filter(product => {
      const searchFields = ['productName', 'barcode', 'productType'];
      return searchFields.some(field => product[field].toLowerCase().includes(value.toLowerCase()));
    });
    setFilteredInventory(filteredProducts);
  };

  const handleFilter = (value) => {
    if (value === '') {
      setFilteredInventory(inventory);
    } else {
      const filteredProducts = inventory.filter(product => product.storeLocation === value);
      setFilteredInventory(filteredProducts);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductById(id);
      setInventory((prevInventory) => prevInventory.filter(item => item.id !== id));
      setFilteredInventory(prevFilteredInventory => prevFilteredInventory.filter(item => item.id !== id));
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
    <Container maxWidth="xl" style={{ marginTop: '24px' }}>
    <ProductFilters onSearch={handleSearch} onFilter={handleFilter} />
    {editItem ? (
      <ProductForm initialValues={editItem} onSubmit={handleSubmitForm} />
    ) : (
      <Grid container spacing={3} style={{ margin: '0px' }}>
        {filteredInventory.map((product) => (
          <Grid item key={product._id}>
            <InventoryCard
              {...product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    )}
    </Container>
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