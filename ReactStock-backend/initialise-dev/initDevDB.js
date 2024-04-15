import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import User from '../api/users/userModel';
import products from './products';
import Product from '../api/products/productModel';
import activity from './activity';
import ActivityLog from '../api/activities/activityModel';

async function main() {
    try {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error('This script is only for the development environment.');
        }
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to MongoDB');
        
        // Drop users collection if it exists
        await User.collection.drop().catch(err => console.log('User collection not found:', err));
        
        // Create users
        await User.create(users);
        console.log('Database initialized');
        console.log(`${users.length} users loaded`);

        // Create Products
        await Product.create(products);
        console.log('Database initialized');
        console.log(`${products.length} products loaded`)

        //Create Activity
        await ActivityLog.create(activity);
        console.log('Database initialized');
        console.log(`${activity.length} activity loaded`)
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

main();