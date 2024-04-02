import express from 'express';
import Product from './productModel';

const router = express.Router();

// Route to create a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'})
    }
});

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
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
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update a product by ID
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
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
router.put('/updateByBarcode/:barcode', async (req, res) => {
  try {
      const { barcode } = req.params;
      const updatedData = req.body;
      const product = await Product.findOne({ barcode });

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      const updatedProduct = await Product.findByIdAndUpdate(product._id, updatedData, { new: true });

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Error updating product' });
      }

      res.status(200).json(updatedProduct);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;