const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // Import the User model

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.error('No token provided.');
    return res.status(401).send({ error: 'No token provided.' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const user = await User.findOne({ _id: decoded._id});

    if (!user) {
      console.error('User not found for token:', token);
      console.error('Decoded ID:', decoded._id);
      throw new Error('User not found');
    }

    console.log('User found:', user);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Handle token expiration, e.g., refresh token or require re-login
      return res.status(401).send({ message: 'Token expired. Please log in again.' });
    } else {
      return res.status(401).send({ message: 'Authentication error: Invalid token' });
    }
  }
};

module.exports = authMiddleware;
