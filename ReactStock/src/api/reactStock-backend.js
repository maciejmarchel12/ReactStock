// Logging Activity Function
const logActivity = async (action) => {
    try {
        // Get the user's token from localStorage
        const token = localStorage.getItem("token");

        // Check if token is available
        if (!token) {
            console.error('User token not found. Cannot log activity without authentication.');
            throw new Error('User token not found.');
        }

        // Send activity log request
        const response = await fetch('http://localhost:8080/api/activities/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ action }),
        });

        // Check response status
        if (!response.ok) {
            throw new Error('Failed to log activity');
        }

        // Parse response JSON
        return await response.json();
    } catch (error) {
        console.error('Error logging activity:', error);
        throw error;
    }
};

// Function to set headers with the bearer token
const getHeadersWithToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error('User token not found. Cannot make authenticated requests.');
        throw new Error('User token not found.');
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': token
    };
};

// USERS

// Login API 
export const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ username, password })
        });

        // Check if response is successful
        if (response.ok) {
            // Parse response JSON
            const data = await response.json();
            
            // Store token in local storage
            localStorage.setItem('token', data.token);

            // Log activity after login
            await logActivity('login');

            return data;
        } else {
            throw new Error('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


// Sign Up API
export const signup = async (username, password, permissionLevel) => {
    try {
        // Retrieves the bearer token from local storage
        const token = localStorage.getItem("token");

        // Checks if token is available
        if (!token) {
            console.error('User token not found. Cannot make authenticated requests.');
            throw new Error('User token not found.');
        }

        // Makes the signup request with the bearer token in the headers
        const response = await fetch('http://localhost:8080/api/users?action=register', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Includes the bearer token in the headers
            },
            method: 'post',
            body: JSON.stringify({ username, password, permissionLevel })
        });

        if (response.ok) {
            // Parse response JSON
            const data = await response.json();
            
            // Logs the activity after signing up
            // await logActivity('create_user');

            return data;
        } else {
            throw new Error('Signup failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

// Update user API
export const updateUser = async (userId, userData) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            headers: getHeadersWithToken(),
            method: 'put',
            body: JSON.stringify(userData)
        });
        // Log activity after updating user
        // await logActivity('update_user');
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
            headers: getHeadersWithToken(),
            method: 'delete'
        });
        // Log activity after deleting user
        // await logActivity('delete_user');
        return response.json();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Get a user by ID
export const getUserById = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            headers: getHeadersWithToken()
        });
        return response.json();
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};

// Get all Users
export const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/users', {
            headers: getHeadersWithToken()
        });
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
            headers: getHeadersWithToken(),
            method: 'post',
            body: JSON.stringify(productData)
        });
        // Log activity after creating product
        // await logActivity('create_product');
        return response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/products/', {
            headers: getHeadersWithToken()
        });
        const data = await response.json();
        return data.series || [];
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};

// Get a single product by ID
export const getProductById = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            headers: getHeadersWithToken()
        });
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
            headers: getHeadersWithToken(),
            method: 'put',
            body: JSON.stringify(updatedData)
        });
        // Log activity after updating product
        // await logActivity('update_product');
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
            headers: getHeadersWithToken(),
            method: 'delete'
        });
        // Log activity after deleting product
        await logActivity('delete_product');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to delete product');
        }
        return data;
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw error;
    }
};

// Get product by barcode
export const getProductByBarcode = async (barcode) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/barcode/${barcode}`, {
            headers: getHeadersWithToken()
        });
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
            headers: getHeadersWithToken(),
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
            headers: getHeadersWithToken(),
            method: 'put',
            body: JSON.stringify(updatedData)
        });
        // Log activity after updating product by barcode
        // await logActivity('update_product');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error updating product by barcode: ' + error.message);
    }
};

// Get all products for pie chart
export const getAllProductsForPieChart = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/products/pie-chart');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting products for pie chart:', error);
        throw error;
    }
};

// ACTIVITY LOGS

// Get all activity logs
export const getAllActivityLogs = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/activities/', {
            headers: getHeadersWithToken()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch activity logs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting activity logs:', error);
        throw error;
    }
};

// Get an activity log by ID
export const getActivityLogById = async (activityLogId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/activities/${activityLogId}`, {
            headers: getHeadersWithToken()
        });
        return response.json();
    } catch (error) {
        console.error('Error getting activity log by ID:', error);
        throw error;
    }
};

// Delete an activity log by ID
export const deleteActivityLogById = async (activityLogId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/activities/${activityLogId}`, {
            headers: getHeadersWithToken(),
            method: 'delete'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to delete activity log');
        }
        return data;
    } catch (error) {
        console.error('Error deleting activity log by ID:', error);
        throw error;
    }
};

