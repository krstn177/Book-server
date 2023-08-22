const Order = require('../models/Order');

async function getAll() {
    return Order.find({});
}

async function getById(id) {
    return Order.findById(id);
}

async function create(order) {
    return Order.create(order);
}

async function update(id, order) {
    const initialOrder = await Order.findById(id);

    initialOrder.firstName = order.firstName;
    initialOrder.lastName = order.lastName;
    initialOrder.email = order.email;
    initialOrder.phoneNumber = order.phoneNumber;
    initialOrder.address = order.address;
    initialOrder.isCompleted = order.Completed;

    return initialOrder.save();
}

async function completeOrder(id) {
    const order = await Order.findById(id);

    order.isCompleted = true;

    return order.save();
}

async function removeById(id) {
    return Order.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    removeById,
    completeOrder
}

