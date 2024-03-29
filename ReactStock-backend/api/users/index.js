import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Password validator function
const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

// Get all users
router.get('/', async (req, res) =>{
    const users = await User.find();
    res.status(200).json(users);
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ success: false, msg: 'User not found.' });
        }
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

// Register (Create) a new user
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.permissionLevel) {
            return res.status(400).json({ success: false, msg: 'Username, password, and permission level are required.' });
        }

        // Validate permission level
        const permissionLevels = ['employee', 'manager', 'admin']; // Adjusted casing
        if (!permissionLevels.includes(req.body.permissionLevel)) {
            return res.status(400).json({ success: false, msg: 'Invalid permission level.' });
        }

        // Validate password
        if (!isPasswordValid(req.body.password)) {
            return res.status(400).json({ success: false, msg: 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.' });
        }

        // Check if username already exists
        const existingUser = await User.findByUserName(req.body.username);
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'Username already exists.' });
        }

        // Create a new user
        await User.create(req.body);
        res.status(201).json({ success: true, msg: 'User successfully created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Login route
router.post('/login', asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findByUserName(username);
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ username: user.username, permissionLevel: user.permissionLevel }, process.env.SECRET);
            res.status(200).json({ success: true, token: 'BEARER ' + token, permissionLevel: user.permissionLevel });
        } else {
            res.status(401).json({ success: false, msg: 'Wrong password.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;

    try {
        // Validate permission level if included in the update
        if (req.body.permissionLevel && !['employee', 'manager', 'admin'].includes(req.body.permissionLevel)) {
            return res.status(400).json({ success: false, msg: 'Invalid permission level.' });
        }

        // Hash the password if included in the update
        if (req.body.password) {
            const saltRounds = 10;
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        const result = await User.updateOne({ _id: req.params.id }, req.body);

        if (result.matchedCount) {
            res.status(200).json({ success: true, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ success: false, msg: 'Unable to Update User' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, msg: 'User deleted successfully.' });
        } else {
            res.status(404).json({ success: false, msg: 'User not found.' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

export default router;