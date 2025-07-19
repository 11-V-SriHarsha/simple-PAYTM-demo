require('dotenv').config();
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ Missing or invalid Authorization header");
        return res.status(403).json({ message: "Forbidden: Missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log("❌ Invalid token:", err.message);
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

module.exports = {
    authMiddleware
}