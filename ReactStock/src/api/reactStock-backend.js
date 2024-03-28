
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