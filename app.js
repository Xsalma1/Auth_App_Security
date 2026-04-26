// File: app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Database
connectDB();

// Sync Database
sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Database & Tables Synced");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// Home route to serve the Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});