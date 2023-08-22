const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'iorh209i1hzx7c9v68';

const tokenBlacklist = new Set();

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Imposter is trying to log in');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Imposter is trying to log in');
    }

    return createToken(user);
}

async function logout(token){
    tokenBlacklist.add(token);
}

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
    };

    return {
        _id: user._id,
        username: user.username,
        accessToken: jwt.sign(payload, secret)
    };
}

function parseToken(token){
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

module.exports = {
    login,
    logout,
    parseToken
}