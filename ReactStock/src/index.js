import React, {lazy, Suspense, useState, useContext } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/siteHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ProductManager from './components/productManager';
import AuthContextProvider, { AuthContext } from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";

// Lazy load for page components
const HomePage = lazy(() => import('./pages/homePage'));
const Inventory = lazy(() => import('./pages/inventoryPage'));
const AddProduct = lazy(() => import('./pages/addProductPage'));
// User lazy load
const LoginPage = lazy(() => import('./pages/loginPage'));
const UserPage = lazy(() => import('./pages/userPage'));
const SignUpPage = lazy(() => import('./pages/signUpPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

// Custom Theme
const theme = createTheme({
  // Define your theme configuration here
  palette: {
    primary: {
      main: '#ff0000', // Example primary color
    },
    secondary: {
      main: '#00ff00', // Example secondary color
    },
    // Add more theme configurations as needed
  },
  typography: {
    // Define typography configurations here
    fontFamily: 'Arial, sans-serif', // Example font family
  },
});

const App = () => {
  const { isAuthenticated, permissionLevel } = useContext(AuthContext) || {};
  const [inventory, setInventory] = useState([]);

  const handleAddProduct = (newProduct) => {
    setInventory((prevInventory) => [...prevInventory, newProduct]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/SignUpPage" element={<SignUpPage />} />
                <Route
                  path="/"
                  element={<ProtectedRoutes isAuthenticated={isAuthenticated} permissionLevel={permissionLevel} />}
                >
                  <Route path="/UserPage" element={<UserPage />} />
                  {/* <Route
                    path="/SignUpPage"
                    element={
                      isAuthenticated && (permissionLevel === 'admin' || permissionLevel === 'manager') ? (
                        <SignUpPage />
                      ) : (
                        <Navigate to="/SignUpPage" replace />
                      )
                    }
                  /> */}
                  <Route path="/addProductPage" element={<AddProduct onAddProduct={handleAddProduct} />} />
                  <Route path="/inventoryPage" element={<Inventory inventory={inventory} />} />
                </Route>
              </Routes>
            </AuthContextProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(<App />);