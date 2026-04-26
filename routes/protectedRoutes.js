const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middleware/authMiddleware');

// 1. Admin Route
router.get('/admin', verifyToken, authorize(['Admin']), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

// 2. Manager Route (Only Admin and Manager can access)
router.get('/manager', verifyToken, authorize(['Admin', 'Manager']), (req, res) => {
    res.json({ message: "Welcome Manager" });
});

// 3. General Profile Route (All roles)
router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: "Profile Data", user: req.user });
});

module.exports = router;