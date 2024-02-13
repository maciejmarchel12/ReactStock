import React, {lazy, Suspense, useState } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/siteHeader';
import ProductManager from './components/productManager'

// Lazy load for page components
const HomePage = lazy(() => import("./pages/homePage"));
const Inventory = lazy(() => import("./pages/inventoryPage"));
const AddProduct = lazy(() => import("./pages/addProductPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [inventory, setInventory] = useState([]);

  const handleAddProduct = (newProduct) => {
    setInventory((prevInventory) => [...prevInventory, newProduct]);
  };

  return (
  <Suspense fallback={<div>Loading...</div>}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/addProductPage" element={<AddProduct onAddProduct={handleAddProduct} />} />
        <Route path="/inventoryPage" element={<Inventory inventory={inventory} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/productManager" element={<ProductManager />} />
        <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Suspense>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);