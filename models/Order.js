const { Schema, model, Types: { ObjectId } } = require('mongoose');

const phoneNumberPattern = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const orderSchema = new Schema({
    firstName: { type: String, required: true, minLength: [3, 'First name must be more than 3 characters long!']},
    lastName: { type: String, required: true, minLength: [3, 'Last name must be more than 3 characters long!']},
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, validate: {
        validator: (value) => phoneNumberPattern.test(value),
        message: 'Invalid phone number'
    }},
    address: { type: String, required: true, minLength: [5, 'Adress must be more than 5 characters long!']},
    count: { type: Number, required: true, default: 1},
    isCompleted: { type: Boolean, default: false}
}, {
    timestamps: { 
        createdAt: true,
        updatedAt: false
    }
});

const Order = model('Order', orderSchema);

module.exports = Order;