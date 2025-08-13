// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with optional filters for category and stock
router.get('/', async (req, res) => {
  try {
    const { category, inStock } = req.query;
    const filter = {}; // Initialize an empty filter object

    // Add category filter if provided, using a case-insensitive search
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    // Add stock filter if requested
    if (inStock === 'true') {
      filter.stockQty = { $gt: 0 };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;