import express from 'express';
import Product from './productModel';
import logActivityMiddleware from '../../activityLogger/logActivitiyMiddleware';
import authenticate from '../../authenticate';

const router = express.Router();

// Middleware for error handling
const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

// Middleware for authentication
const checkAuthentication = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Route to create a new product
router.post('/', authenticate, logActivityMiddleware, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, msg: 'Product Created Successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
});

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ series: products });
  } catch (error) {
    errorHandler(res, error);
  }
});

// Route to get all products for pie chart
router.get('/pie-chart', async (req, res) => {
  try {
      const products = await Product.find();
      const pieChartData = products.map(product => ({
          label: product.productName, // Change to the appropriate property name that represents the label
          value: parseInt(product.amountAvailable) // Convert amountAvailable to an integer
      }));
      res.status(200).json(pieChartData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error'})
  }
});

// Route to get a single product by ID
router.get('/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      if (!product._id) {
          return res.status(500).json({ message: 'Product ID is missing' });
      }
      res.status(200).json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update a product by ID
router.put('/:id', authenticate, logActivityMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a product by ID
router.delete('/:id', authenticate, logActivityMiddleware, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, msg: 'Product Deleted Successfully' });
    } else {
      res.status(404).json({ success: false, msg: 'Product Not Found' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

//Barcode Scanning

// Route to get a product by barcode
router.get('/barcode/:barcode', async (req, res) => {
  try {
      const product = await Product.findOne({ barcode: req.params.barcode });
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle barcode scanning and update product amount
router.post('/scan', async (req, res) => {
  try {
    const { barcode, isSubtractMode } = req.body;
    const product = await Product.findOne({ barcode });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update amount available based on subtract mode
    if (isSubtractMode) {
      product.amountAvailable = Math.max(0, product.amountAvailable - 1); // Ensure amount doesn't go negative
    } else {
      product.amountAvailable++;
    }

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update a product by barcode
router.put('/updateByBarcode/:barcode', authenticate, logActivityMiddleware, async (req, res) => {
  try {
    const { barcode } = req.params;
    const updatedData = req.body;

    const product = await Product.findOneAndUpdate({ barcode }, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    errorHandler(res, error);
  }
});

export default router;