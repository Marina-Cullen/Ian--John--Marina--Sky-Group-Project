const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, ValidationError } = require('sequelize');
const User = require('../models/UserModel');

const UserController = {
    // Registering a new user
    register: async (req, res) => {
        try {
            const { name, alias, email, password } = req.body;
            
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use." });
            }
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = await User.create({
                name,
                alias,
                email,
                password: hashedPassword
            });
            
            res.status(201).json({
                message: "User registered successfully.",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    alias: newUser.alias,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                }
            });
            
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: error.errors.map(e => e.message)
                });
            }
            console.error(error);
            res.status(500).json({ message: "Error registering new user." });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: "User not found." });
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials." });
            }
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({
                message: "Logged in successfully.",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    alias: user.alias,
                    email: user.email
                }
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error logging in." });
        }
    },

};

module.exports = UserController;
