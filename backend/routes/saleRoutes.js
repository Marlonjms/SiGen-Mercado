// backend/routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const { createSale } = require('../models/Sale');
const { updateStock } = require('../models/Product');

// Rota para criar uma nova venda
router.post('/create', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Criar a venda
        const sale = await createSale(productId, quantity);
        
        // Atualizar o estoque do produto
        const updatedProduct = await updateStock(productId, quantity);

        res.json({ sale, updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a venda' });
    }
});

module.exports = router;
