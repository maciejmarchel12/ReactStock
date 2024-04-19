import React, { useState, useEffect } from 'react';
import InventoryCard from '../components/inventoryCard';
import ProductForm from '../components/productForm';
import ProductFilters from '../components/productFilters';
import { getAllProducts, deleteProductById } from '../api/reactStock-backend';
import { Grid, Container } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarcodeScanner from '../components/barcodeScan';
import SubtractModeSwitch from '../components/subtractSwitch';
import { useTheme } from '../contexts/themeContext';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isSubtractMode, setIsSubtractMode] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    inventory.forEach(checkAmountAvailable);
  }, [inventory]);

  // toast notifications
  const checkAmountAvailable = (product) => {
    console.log(`Checking amount available for ${product.productName}`);
    if (product.amountAvailable <= 15) {
      console.log(`${product.productName} is low in stock!`);
      toast.warning(`${product.productName} is low in stock!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleBarcodeScanned = async () => {
    await fetchInventory();
  };

  const fetchInventory = async () => {
    try {
      const products = await getAllProducts();
      console.log('Fetched inventory:', products);
      setInventory(products);
      setFilteredInventory(products);
    //  products.forEach(checkAmountAvailable); // Check the amount available for each product for toast notifs
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

  const handleToggleSubtractMode = () => {
    console.log('Toggle subtract mode');
    setIsSubtractMode(!isSubtractMode);
    console.log('Subtract Mode:', isSubtractMode);
    fetchInventory(); // Fetch inventory again after toggling subtract mode
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await deleteProductById(id);
        setInventory((prevInventory) => prevInventory.filter(item => item.id !== id));
        setFilteredInventory(prevFilteredInventory => prevFilteredInventory.filter(item => item.id !== id));
        await fetchInventory();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSubmitForm = async () => {
    try {
        await fetchInventory();
        setEditItem(null);
    } catch (error) {
        console.error('Error handling form submission:', error);
    }
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.bkg, minHeight: '100vh' }}>
      <BarcodeScanner 
        onBarcodeScanned={handleBarcodeScanned} 
        isSubtractMode={isSubtractMode} 
      />
      <Container maxWidth="xl" style={{ marginTop: '24px', paddingTop: 64, paddingBottom: 98 }}>
        <ProductFilters 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
        />
      <SubtractModeSwitch
        isSubtractMode={isSubtractMode} 
        setIsSubtractMode={setIsSubtractMode} 
      />
        {!editItem ? (
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
        ) : (
          <ProductForm initialValues={editItem} onSubmit={handleSubmitForm} />
        )}
      </Container>
    </div>
  );
};

export default InventoryPage;
