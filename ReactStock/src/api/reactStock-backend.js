

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