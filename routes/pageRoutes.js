const express = require("express");
const router = express.Router();
const path = require("path");

// Serve static HTML pages
router.get("/", (req, res) => res.sendFile(path.join(__dirname, "../views/index.html")));
router.get("/about", (req, res) => res.sendFile(path.join(__dirname, "../views/about.html")));
router.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "../views/contact.html")));
router.get("/portfolio", (req, res) => res.sendFile(path.join(__dirname, "../views/portfolio.html")));
router.get("/department", (req, res) => res.sendFile(path.join(__dirname, "../views/department.html")));
router.get("/subdepartment", (req, res) => res.sendFile(path.join(__dirname, "../views/subdepartment.html")));
router.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "../views/dashboard.html")));

module.exports = router;
