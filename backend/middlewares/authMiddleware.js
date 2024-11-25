const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => (req, res, next) => {
    console.log('Auth Middleware Triggered');

    // Extract the token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    console.log('Token received:', token);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('JWT Verification Failed:', err.message);
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        console.log('Token Decoded Successfully:', decoded);

        // Role validation
        if (roles.length && !roles.includes(decoded.role)) {
            console.log('Insufficient Role:', decoded.role);
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }

        // Attach user to request
        req.user = decoded;
        console.log('User Authorized:', decoded);
        next(); // Call next() to proceed
    });
};

module.exports = authMiddleware;
