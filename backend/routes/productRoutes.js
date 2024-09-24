// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../models/Product');

router.post('/create', async (req, res) => {
    const { barcode, description, ncm, purchasePrice, salePrice, salePercent, stock } = req.body;
    const product = await createProduct(barcode, description, ncm, purchasePrice, salePrice, salePercent, stock);
    res.json(product);
});

router.get('/', async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
});

module.exports = router;
