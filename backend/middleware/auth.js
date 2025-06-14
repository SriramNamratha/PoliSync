const jwt = require('jsonwebtoken');
const User = require('../models/User');

const USER_ROLES = {
  CITIZEN: 'citizen',
  OFFICER: 'officer',
};

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      let token;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token; // ✅ read from cookie
      } else {
        return res.status(401).json({ error: 'Missing or invalid token' });
      }


      // Verify token, throws if invalid/expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded id
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      console.log("🔐 Authenticated user role:", user.role);

      // Check if user role is allowed (if roles specified)
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // Attach user & token to req for downstream use
      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      // Differentiate JWT errors if needed
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired, please login again' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token, please login again' });
      }

      // Fallback error
      res.status(401).json({ error: 'Please authenticate' });
    }
  };
};




module.exports = { auth, USER_ROLES };
