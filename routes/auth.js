const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = 'chave-secreta-123';

const fakeUser = {
    username: 'admin',
    password: '1234'
};

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (username === fakeUser.username && password === fakeUser.password) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciais inválidas' });
});

module.exports = router;
