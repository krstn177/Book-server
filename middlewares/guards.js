function hasUser(){
    return (req, res, next) => {
        if (req.user) {
            next();
        } else{
            res.status(401).json({ message: 'Use an account'});
        }
    }
}
function isGuest(){
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else{
            res.status(400).json({ message: 'You are already logged in'});
        }
    }
}

module.exports = {
    hasUser,
    isGuest
}