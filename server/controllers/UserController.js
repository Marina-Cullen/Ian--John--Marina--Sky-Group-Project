const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, ValidationError } = require('sequelize');
const User = require('../models/UserModel');

const UserController = {
    // Registering a new user
    register: async (req, res) => {
        try {
            const { first_name, last_name, alias, email, password } = req.body;
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use." });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                first_name,
                last_name,
                alias,
                email,
                password: hashedPassword
            });

            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


            res.status(201).json({
                message: "User registered successfully.",
                user: {
                    id: newUser.id,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    alias: newUser.alias,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                },
                token, // Ensure that the token is included in the response
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
    // User login
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
                    first_name: user.first_name,
                    last_name: user.last_name,
                    alias: user.alias,
                    email: user.email
                }
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error logging in." });
        }
    },

    // Get user profile
    getUserProfile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching user profile." });
        }
    },
};

module.exports = UserController;
