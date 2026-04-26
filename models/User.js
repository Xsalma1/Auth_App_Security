const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Defining the User Table Structure
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Manager', 'User'),
        defaultValue: 'User'
    },
    tfaSecret: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = User;