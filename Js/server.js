const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // change to your MySQL username
  password: "",       // change to your MySQL password
  database: "random_student"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

const upload = multer({ dest: "uploads/" });

// Import Excel file
app.post("/import", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  if (!data.length) return res.status(400).send("No data found");

  const names = data.map(row => [row.name || row.Name]);
  db.query("INSERT INTO students (name) VALUES ?", [names], (err) => {
    if (err) throw err;
    res.send("✅ Excel data imported successfully!");
  });
});

// Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get one random student
app.get("/random", (req, res) => {
  db.query("SELECT * FROM students ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// 🔥 NEW: Randomly divide students into groups
app.get("/groups/:count", (req, res) => {
  const groupCount = parseInt(req.params.count);

  db.query("SELECT name FROM students", (err, result) => {
    if (err) throw err;

    const students = result.map(r => r.name);
    if (students.length === 0) return res.json({ message: "No students found!" });

    // Shuffle students
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [students[i], students[j]] = [students[j], students[i]];
    }

    // Split into groups
    const groups = Array.from({ length: groupCount }, () => []);
    students.forEach((student, i) => {
      groups[i % groupCount].push(student);
    });

    res.json({ groupCount, groups });
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));

