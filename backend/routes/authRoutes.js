// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
