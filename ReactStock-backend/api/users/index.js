import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logActivityMiddleware from '../../activityLogger/logActivitiyMiddleware';
import authenticate from '../../authenticate';

const router = express.Router();

// Middleware for error handling
const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  };

// Password validator function
const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

// Get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      errorHandler(res, error);
    }
  });

// Get a user by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ success: false, msg: 'User not found.' });
    }
  }));

// Register (Create) a new user
router.post('/', authenticate, logActivityMiddleware, asyncHandler(async (req, res) => {
    try {
      const { username, password, permissionLevel } = req.body;
  
      if (!username || !password || !permissionLevel) {
        return res.status(400).json({ success: false, msg: 'Username, password, and permission level are required.' });
      }
  
      // Validate permission level
      const permissionLevels = ['employee', 'manager', 'admin'];
      if (!permissionLevels.includes(permissionLevel)) {
        return res.status(400).json({ success: false, msg: 'Invalid permission level.' });
      }
  
      // Validate password
      if (!isPasswordValid(password)) {
        return res.status(400).json({ success: false, msg: 'Password requirements not met.' });
      }
  
      // Check if username already exists
      const existingUser = await User.findByUserName(username);
      if (existingUser) {
        return res.status(400).json({ success: false, msg: 'Username already exists.' });
      }
  
      // Create a new user
      await User.create(req.body);
      res.status(201).json({ success: true, msg: 'User successfully created.' });
    } catch (error) {
      errorHandler(res, error);
    }
  }));

// Login route
router.post('/login', logActivityMiddleware, asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findByUserName(username);
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
        }

        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            const token = jwt.sign({ username: user.username, permissionLevel: user.permissionLevel }, process.env.SECRET);
            res.status(200).json({ success: true, token: 'BEARER ' + token, permissionLevel: user.permissionLevel });
        } else {
            res.status(401).json({ success: false, msg: 'Wrong password.' });
        }
    } catch (error) {
        errorHandler(res, error);
    }
}));

// Update a user
router.put('/:id', authenticate, logActivityMiddleware, asyncHandler(async (req, res) => {
    try {
      const { password, permissionLevel } = req.body;
  
      // Validate permission level if included in the update
      if (permissionLevel && !['employee', 'manager', 'admin'].includes(permissionLevel)) {
        return res.status(400).json({ success: false, msg: 'Invalid permission level.' });
      }
  
      // Hash the password if included in the update
      if (password) {
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(password, saltRounds);
      }
  
      const result = await User.updateOne({ _id: req.params.id }, req.body);
  
      if (result.matchedCount) {
        res.status(200).json({ success: true, msg: 'User Updated Successfully' });
      } else {
        res.status(404).json({ success: false, msg: 'Unable to Update User' });
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }));

// Delete a user by ID
router.delete('/:id', authenticate, logActivityMiddleware, asyncHandler(async (req, res) => {
    try {
      const result = await User.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.status(200).json({ success: true, msg: 'User Deleted Successfully' });
      } else {
        res.status(404).json({ success: false, msg: 'User Not Found' });
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }));

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