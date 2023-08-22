const orderController = require('express').Router();

const { hasUser, isGuest} = require('../middlewares/guards');
const { getAll, create, getById, update, removeById, completeOrder} = require('../services/orderService');
const { parseError } = require('../utils/errorParser');

orderController.get('/', hasUser(), async (req, res)=>{
    let orders = await getAll();
    res.json(orders);
});

orderController.post('/create', isGuest(), async (req, res) => {
    try{
        const data = req.body;
        const order =  await create(data);
        res.status(201).json(order)
    } catch(err){
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

orderController.get('/:id', hasUser(), async (req, res) => {
    const order = await getById(req.params.id);
    res.json(order);
});

orderController.put('/:id', hasUser(), async (req, res) => {
    const order = await getById(req.params.id);
    if (!order) {
        res.status(403).json({ message: 'You are not allowed to modify this order' });
    }

    try{
        const result = await update(req.params.id, req.body);
        res.json(result);
    } catch(err){
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

orderController.get('/:id/complete', hasUser(), async (req, res) => {
    const order = await getById(req.params.id);
    if (!order) {
        res.status(403).json({ message: 'You are not allowed to modify this order' });
    }

    try{
        const result = await completeOrder(req.params.id);
        res.json(result);
    } catch(err){
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

orderController.delete('/:id', hasUser(), async (req, res) => {
    const order = await getById(req.params.id);
    if (!order) {
        res.status(403).json({ message: 'You are not allowed to delete this order' });
    }
    try{
        await removeById(req.params.id);
        res.status(204).end();
    } catch(err){
        const message = parseError(err);
        res.status(400).json({ message });
    }   
});

module.exports = orderController;