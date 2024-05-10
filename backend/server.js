const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nsn0407",
    database: "crud_rjs"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "Error querying database" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
    const values = [req.body.name, req.body.age];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data into database:", err);
            return res.status(500).json({ error: "Error inserting data into database" });
        }
        return res.json({ message: "User created successfully" });
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});