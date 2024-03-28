import express  from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import productRouter from './api/products'
import './db';
import authenticate from './authenticate';
import defaultErrHandler from './errHandler'

dotenv.config();

const app = express();
//const port = process.env.PORT || 8080;
const port = process.env.PORT; 

app.use(cors())
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use(defaultErrHandler);

// Example Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});