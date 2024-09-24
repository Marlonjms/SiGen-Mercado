// backend/models/Sale.js
const pool = require('../db');

const createSale = async (productId, quantity) => {
    const result = await pool.query(
        'INSERT INTO sales (product_id, quantity) VALUES ($1, $2) RETURNING *',
        [productId, quantity]
    );
    return result.rows[0];
};

module.exports = { createSale };
