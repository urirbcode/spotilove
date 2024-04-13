const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const JWT_SECRET = process.env.JWT_SECRET;


// User registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
            db.get(sql, [username, email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.run(sql, [username, email, hashedPassword], (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

// User login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], async (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!user) {
            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            // Compare the provided password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                // Generate a JWT token
                const token = jwt.sign({ userId: user.id }, JWT_SECRET);
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }
    });
});

module.exports = router;