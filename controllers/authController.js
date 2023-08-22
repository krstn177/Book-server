const authController = require('express').Router();

const { login, logout } = require('../services/authService');
const { parseError } = require('../utils/errorParser');

authController.post('/login', async (req, res) => {
    try{
        const token = await login(req.body.username, req.body.password);
        res.json(token);
    } catch(err){
        const message = parseError(err);
        res.status(401).json({ message });
    }
}); 

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

module.exports = authController;