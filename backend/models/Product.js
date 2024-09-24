// backend/models/Product.js
const pool = require('../db');

const createProduct = async (barcode, description, ncm, purchasePrice, salePrice, salePercent, stock) => {
    const result = await pool.query(
        'INSERT INTO products (barcode, description, ncm, purchase_price, sale_price, sale_percent, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [barcode, description, ncm, purchasePrice, salePrice, salePercent, stock]
    );
    return result.rows[0];
};

const getAllProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

const updateStock = async (productId, quantity) => {
    const result = await pool.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 RETURNING *',
        [quantity, productId]
    );
    return result.rows[0];
};

module.exports = { createProduct, getAllProducts, updateStock };
