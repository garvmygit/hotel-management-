
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


app.use(morgan("dev")); 
app.use(helmet()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(cors()); 


app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "views", "about.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "views", "contact.html")));
app.get("/rooms", (req, res) => res.sendFile(path.join(__dirname, "views", "rooms.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "views", "home.html")));

app.get("/portfolio", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "portfolio.html"));
});
const pages = ["register","login", "subdepartment","department" ,"thank-you","rooms","dashboard","home","404"];
pages.forEach((page) => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, "views", `${page}.html`));
    });
});


app.post("/register", (req, res) => {
    const { username, password } = req.body;
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

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

    if (users[username] && users[username] === password) {
        return res.redirect("/index");
    } else {
        return res.redirect("/register");
        // return res.status(401).send("Invalid credentials");
    }
});

app.get("/index", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));


app.use((req, res, next) => {
    res.status(404).send("404 - Page Not Found");
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 - Internal Server Error");
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
