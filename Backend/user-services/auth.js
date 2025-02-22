import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        // console.log(decoded);
        next();
    } catch (e) {
        return res.status(500).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;