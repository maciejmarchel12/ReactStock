import express  from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import defaultErrHandler from './errHandler'

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(defaultErrHandler);

// Example Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});