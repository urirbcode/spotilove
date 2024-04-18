const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const JWT_SECRET = process.env.JWT_SECRET;


// User registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await db.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { user, error } = await db.auth.signIn({ email, password });
      if (error) {
        throw error;
      }
      res.json({ token: user.token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

module.exports = router;