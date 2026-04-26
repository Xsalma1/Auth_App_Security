const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const { generate2FA } = require('../utils/qrGenerator');

// 1. Register User & Show QR Code
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate 2FA Secret for Google Authenticator
        const tfaData = await generate2FA(email);

        // Create user in MySQL
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            tfaSecret: tfaData.secret
        });

        res.status(201).json({
            message: "User registered successfully",
            qrCode: tfaData.qrCodeImage // Display this in UI
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Login Step 1 (Verify Password)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Password OK. Enter 6-digit 2FA code." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Verify 2FA & Generate JWT Token
exports.verify2FA = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Verify the code from Google Authenticator App
        const isVerified = speakeasy.totp.verify({
            secret: user.tfaSecret,
            encoding: 'base32',
            token: code
        });

        if (isVerified) {
            // Success! Generate Final JWT
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            res.json({ token, role: user.role });
        } else {
            res.status(400).json({ message: "Invalid 2FA code" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};