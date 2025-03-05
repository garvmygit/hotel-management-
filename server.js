const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(morgan("dev")); // Logs HTTP requests
app.use(helmet()); // Security middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parses JSON payloads
app.use(cookieParser()); // Parses cookies
app.use(cors()); // Enables CORS

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Serve HTML pages dynamically
const pages = ["index", "register", "login", "subdepartment", "department", "thank-you", "rooms", "home"];
pages.forEach((page) => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, "public", `${page}.html`));
    });
});

// Register User
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    let users = {};

    if (fs.existsSync("users.json")) {
        users = JSON.parse(fs.readFileSync("users.json", "utf8"));
    }

    if (users[username]) {
        return res.status(400).send("User already exists");
    }

    users[username] = password;
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    res.redirect("/login");
});

// Login User
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    if (!fs.existsSync("users.json")) {
        return res.status(401).send("No users registered.");
    }

    const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

    if (users[username] && users[username] === password) {
        return res.redirect("/dashboard");
    } else {
        return res.status(401).send("Invalid credentials");
    }
});

// Dashboard Page
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// 404 Error Middleware
app.use((req, res, next) => {
    res.status(404).send("404 - Page Not Found");
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 - Internal Server Error");
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
