const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../users.json");

const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        return {};
    }
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data || "{}");
};

const saveUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};

module.exports = { readUsersFromFile, saveUsersToFile };
