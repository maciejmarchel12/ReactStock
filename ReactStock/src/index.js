import React, {lazy, Suspense, useState, useContext } from 'react';
import { createRoot } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import Footer from './components/siteFooter';
// import ProductManager from './components/productManager';
import AuthContextProvider, { AuthContext } from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
import Header from './components/siteHeader/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from './contexts/themeContext';
// import Theme from './components/theme';

// Lazy load for page components
const HomePage = lazy(() => import('./pages/homePage'));
const Inventory = lazy(() => import('./pages/inventoryPage'));
const AddProduct = lazy(() => import('./pages/addProductPage'));
const ActivityLog = lazy(() => import('./pages/activityLogsPage'));
// User lazy load
const LoginPage = lazy(() => import('./pages/loginPage'));
const UserPage = lazy(() => import('./pages/userPage'));
const SignUpPage = lazy(() => import('./pages/signUpPage'));
const UserEditPage = lazy(() => import('./pages/editUserPage.js'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { isAuthenticated, permissionLevel } = useContext(AuthContext) || {};
  const [inventory, setInventory] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const Theme = useTheme();

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  }

  const handleAddProduct = (newProduct) => {
    setInventory((prevInventory) => [...prevInventory, newProduct]);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthContextProvider>
            <Header settingsOpen={settingsOpen} handleSettingsToggle={handleSettingsToggle} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/SignUpPage" element={<SignUpPage />} />
                <Route
                  path="/"
                  element={<ProtectedRoutes />}
                >
                  <Route path="/activityLogsPage" element={<ActivityLog />} />
                  <Route path="/UserPage" element={<UserPage />} />
                  <Route path="/addProductPage" element={<AddProduct onAddProduct={handleAddProduct} />} />
                  <Route path="/inventoryPage" element={<Inventory inventory={inventory} />} />
                  <Route path="/edit-user/:userId" element={<UserEditPage />} />
                </Route>
              </Routes>
            </AuthContextProvider>
            </BrowserRouter>
            <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(<App />);