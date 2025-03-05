// const http = require("http");
// const fs = require("fs");
// const path = require("path");


// const usersFilePath = path.join(__dirname, "users.json");


// const readUsersFromFile = () => {
//     if (!fs.existsSync(usersFilePath)) {
//         return {};
//     }
//     const data = fs.readFileSync(usersFilePath, "utf8");
//     return JSON.parse(data || "{}");
// };


// const saveUsersToFile = (users) => {
//     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
// };


// const serveStatic = (res, filePath, contentType) => {
//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code === "ENOENT") {
//                 res.writeHead(404, { "Content-Type": "text/plain" });
//                 res.end("404 Not Found");
//             } else {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.end("500 Internal Server Error");
//             }
//         } else {
//             res.writeHead(200, { "Content-Type": contentType });
//             res.end(content);
//         }
//     });
// };


// const handleRequest = (req, res) => {
//     const url = req.url;

//     if (url.startsWith("/public/")) {
//         const filePath = `.${url}`;
//         const extname = path.extname(filePath);
//         let contentType = "text/plain";

//         switch (extname) {
//             case ".css":
//                 contentType = "text/css";
//                 break;
//             case ".js":
//                 contentType = "application/javascript";
//                 break;
//             case ".jpg":
//             case ".jpeg":
//                 contentType = "image/jpeg";
//                 break;
//             case ".png":
//                 contentType = "image/png";
//                 break;
//             case ".gif":
//                 contentType = "image/gif";
//                 break;
//             case ".svg":
//                 contentType = "image/svg+xml";
//                 break;
//             default:
//                 contentType = "application/octet-stream";
//         }

//         serveStatic(res, filePath, contentType);
//     } else if (url === "/" || url === "/index.html") {
//         serveStatic(res, "./views/index.html", "text/html");
//     } else if (url === "/register" && req.method === "GET") {
//         serveStatic(res, "./views/register.html", "text/html");
//     }
//     else if (url === "/portfolio" && req.method === "GET") {
//         serveStatic(res, "./views/portfolio.html", "text/html");
//     } 
//     else if (url === "/department" && req.method === "GET") {
//         serveStatic(res, "./views/department.html", "text/html");
//     }
//     else if (url === "/contact" && req.method === "GET") {
//         serveStatic(res, "./views/contact.html", "text/html");
//     }
//     else if (url === "/about" && req.method === "GET") {
//         serveStatic(res, "./views/about.html", "text/html");
//     }
//     else if (url === "/subdepartment" && req.method === "GET") {
//         serveStatic(res, "./views/subdepartment.html", "text/html");
//     }else if (url === "/register" && req.method === "POST") {
//         let body = "";
//         req.on("data", (chunk) => {
//             body += chunk;
//         });
//         req.on("end", () => {
//             const parsedBody = new URLSearchParams(body);
//             const username = parsedBody.get("username");
//             const password = parsedBody.get("password");

//             if (username && password) {
//                 const users = readUsersFromFile();
//                 if (users[username]) {
//                     // User already exists
//                     res.writeHead(302, { Location: "/register?error=exists" });
//                 } else {
//                     // Save new user
//                     users[username] = password;
//                     saveUsersToFile(users);
//                     res.writeHead(302, { Location: "/login" });
//                 }
//                 res.end();
//             } else {
//                 res.writeHead(302, { Location: "/register?error=invalid" });
//                 res.end();
//             }
//         });
//     } else if (url === "/login" && req.method === "GET") {
//         serveStatic(res, "./views/login.html", "text/html");
//     } else if (url === "/login" && req.method === "POST") {
//         let body = "";
//         req.on("data", (chunk) => {
//             body += chunk;
//         });
//         req.on("end", () => {
//             const parsedBody = new URLSearchParams(body);
//             const username = parsedBody.get("username");
//             const password = parsedBody.get("password");

//             const users = readUsersFromFile();
//             if (users[username] && users[username] === password) {
//                 res.writeHead(302, { Location: "/dashboard" });
//             } else {
//                 res.writeHead(302, { Location: "/login?error=invalid" });
//             }
//             res.end();
//         });
//     } else if (url === "/dashboard") {
//         serveStatic(res, "./views/dashboard.html", "text/html");
//     } else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("404 Not Found");
//     }
// };

// // Start server
// const server = http.createServer(handleRequest);
// server.listen(8080, () => {
//     console.log("Server running at http://localhost:8080/");
// });



// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 8080;

// // Middleware
// app.use(morgan("dev")); // Logs HTTP requests
// app.use(helmet()); // Security middleware
// app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
// app.use(cookieParser()); // Parses cookies
// app.use(cors()); // Enables CORS

// // Serve static files from 'public'
// app.use("/public", express.static(path.join(__dirname, "public")));

// // Serve views (HTML files)
// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
// app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "views", "about.html")));
// app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "views", "contact.html")));
// app.get("/portfolio", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "portfolio.html"));
// });
// const pages = ["register","login", "subdepartment","department" ,"thank-you"];
// pages.forEach((page) => {
//     app.get(`/${page}`, (req, res) => {
//         res.sendFile(path.join(__dirname, "views", `${page}.html`));
//     });
// });

// // Register & Login
// app.post("/register", (req, res) => {
//     const { username, password } = req.body;
//     let users = {};

//     if (fs.existsSync("users.json")) {
//         users = JSON.parse(fs.readFileSync("users.json", "utf8"));
//     }

//     if (users[username]) {
//         return res.status(400).send("User already exists");
//     }

//     users[username] = password;
//     fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
//     res.redirect("/login");
// });

// app.post("/login", (req, res) => {
//     const { username, password } = req.body;
//     const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

//     if (users[username] && users[username] === password) {
//         return res.redirect("/dashboard");
//     } else {
//         return res.status(401).send("Invalid credentials");
//     }
// });

// app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "views", "dashboard.html")));

// // 404 Error Middleware
// app.use((req, res, next) => {
//     res.status(404).send("404 - Page Not Found");
// });

// // General Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send("500 - Internal Server Error");
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8080;
const usersFilePath = path.join(__dirname, "users.json");
const saltRounds = 10;

// Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(session({ secret: "secret-key", resave: false, saveUninitialized: true }));

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Serve views
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "views", "register.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")));
app.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "views", "dashboard.html"));
    } else {
        res.redirect("/login");
    }
});

// Register User
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    let users = fs.existsSync(usersFilePath) ? JSON.parse(fs.readFileSync(usersFilePath, "utf8")) : {};

    if (users[username]) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users[username] = hashedPassword;
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.redirect("/login");
});

// Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const users = fs.existsSync(usersFilePath) ? JSON.parse(fs.readFileSync(usersFilePath, "utf8")) : {};

    if (users[username] && await bcrypt.compare(password, users[username])) {
        req.session.user = username;
        return res.redirect("/dashboard");
    } else {
        return res.status(401).json({ error: "Invalid credentials" });
    }
});

// Logout User
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

// Error Handling
app.use((req, res) => res.status(404).send("404 - Page Not Found"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 - Internal Server Error");
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
