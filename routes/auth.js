const express = require("express");
const router = express.Router();
const pool = require("../db");
// const bcrypt = require("bcrypt");
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// REGISTER ROUTE ---
// (Use post because we want to add data)
router.post("/register", validInfo, async (req, res) => {
    try {
        // 1. Destructure req.body (name, email, password)
        const { name, email, password } = req.body;

        // 2. Check if User Exists- throw err if found
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).json("User Already Exists"); // Unauthenticated
        }

        // 3. Encrypt User Password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // 4. Enter New User into DB
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );
        
        // 5. Generate JWT Token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token: token});

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error');
    }
})

// LOGIN ROUTE ---
router.post("/login", validInfo, async (req, res) => {
    try {
        // 1. Destructure req.body (email, password)
        const { email, password } = req.body;

        // 2. Check if User Exists- throw err if not found
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is Incorrect");
        }

        // 3. Validate if password is the same as DB password
        if (!await bcrypt.compare(password, user.rows[0].user_password)) {
            return res.status(403).json("Incorrect Password");
        }

        // 4. Generate JWT Token
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token: token});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json('Server Error');
    }
})

// VERFIY ROUTE ---
// Set header with token
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json('Server Error');
    }
})

module.exports = router;