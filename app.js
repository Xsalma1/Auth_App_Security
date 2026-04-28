require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
app.use(express.json());

connectDB();
sequelize.sync({ alter: true });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const publicPath = path.join(__dirname, 'public');

// --- الروابط الرسمية للصفحات ---
app.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(publicPath, 'dashboard.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(publicPath, 'profile.html')));
app.get('/admin-role', (req, res) => res.sendFile(path.join(publicPath, 'admin.html')));
app.get('/manager-role', (req, res) => res.sendFile(path.join(publicPath, 'manager.html')));
app.get('/user-role', (req, res) => res.sendFile(path.join(publicPath, 'user.html')));

// الـ Static Files خليه في الآخر خالص
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));