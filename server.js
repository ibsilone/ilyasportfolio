const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'dex_videos'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Serve static files (e.g., uploaded videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload video endpoint
app.post('/upload', upload.single('video'), (req, res) => {
    const { title, description } = req.body;
    const filePath = req.file.path;

    const query = 'INSERT INTO videos (title, description, file_path) VALUES (?, ?, ?)';
    db.query(query, [title, description, filePath], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Video uploaded successfully', id: result.insertId });
    });
});

// Get all videos endpoint
app.get('/videos', (req, res) => {
    const query = 'SELECT * FROM videos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});