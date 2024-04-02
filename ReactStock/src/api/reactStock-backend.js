
// USERS

// Login API 

export const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ username: username, password: password })
        });
        return response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Rethrow the error for handling in the frontend
    }
};


// Sign Up API

export const signup = async (username, password, permissionLevel) => {
    try {
        const response = await fetch('http://localhost:8080/api/users?action=register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ username: username, password: password, permissionLevel: permissionLevel })
        });
        return response.json();
    } catch (error) {
        console.error('Error signing up:', error);
        throw error; // Rethrow the error for handling in the frontend
    }
};

// Update user API
export const updateUser = async (userId, userData) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete user API
export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'delete'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to delete user');
        }
        return data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Get a user by ID
export const getUserById = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        return response.json();
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};

// Get all Users
export const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// PRODUCTS

// Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await fetch('http://localhost:8080/api/products/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(productData)
        });
        return response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/products/');
        return response.json();
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};

// Get a single product by ID
export const getProductById = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        return response.json();
    } catch (error) {
        console.error('Error getting product by ID:', error);
        throw error;
    }
};

// Update a product by ID
export const updateProductById = async (productId, updatedData) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(updatedData)
        });
        return response.json();
    } catch (error) {
        console.error('Error updating product by ID:', error);
        throw error;
    }
};

// Delete a product by ID
export const deleteProductById = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'delete'
        });
        return response.json();
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw error;
    }
};

// Get product by barcode
export const getProductByBarcode = async (barcode) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products?barcode=${barcode}`);
      return response.json();
    } catch (error) {
      console.error('Error getting product by barcode:', error);
      throw error;
    }
  };

// Barcode Scanning
export const scanBarcode = async (barcode, isSubtractMode) => {
    try {
      const response = await fetch('http://localhost:8080/api/products/scan', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ barcode, isSubtractMode })
      });
      return response.json();
    } catch (error) {
      console.error('Error scanning barcode:', error);
      throw error;
    }
};

// Update a product by barcode
export const updateProductByBarcode = async (barcode, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/updateByBarcode/${barcode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error updating product by barcode: ' + error.message);
    }
};