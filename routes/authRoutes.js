const express = require("express");
const router = express.Router();
const { readUsersFromFile, saveUsersToFile } = require("../utils/userUtils");

// GET register page
router.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../views/register.html")));

// POST register
router.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const users = readUsersFromFile();
    if (users[username]) {
        return res.status(409).json({ error: "User already exists" });
    }

    users[username] = password;
    saveUsersToFile(users);
    res.status(201).json({ message: "User registered successfully" });
});

// GET login page
router.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../views/login.html")));

// POST login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const users = readUsersFromFile();
    if (users[username] && users[username] === password) {
        req.session.user = username;
        return res.status(200).json({ message: "Login successful" });
    }

    res.status(401).json({ error: "Invalid username or password" });
});

// GET logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
});

module.exports = router;
