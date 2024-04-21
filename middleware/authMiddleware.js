const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      const { user, error } = await db.auth.getUser(token);
      if (error) {
        throw error;
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid token' });
    }
  }

module.exports = authenticateToken;