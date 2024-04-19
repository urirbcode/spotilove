const express = require('express');
const router = express.Router();
const db = require('../models/db');


// User registration route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Validate email and password fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      console.log('Registering user with email:', email);
      const { user, error } = await db.auth.signUp({ email, password });
      if (error) {
        console.error('Error registering user:', error);
        throw error;
      }
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in /register route:', error);
      res.status(400).json({ error: error.message });
    }
  });

// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { data, error } = await db.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      res.json({ token: data.session.access_token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

module.exports = router;