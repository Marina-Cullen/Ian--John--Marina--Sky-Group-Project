require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize.config');
const userRoutes = require('./routes/User.routes');
const ideaRoutes = require('./routes/Idea.routes');
const app = express();

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/ideas', ideaRoutes);

// Sync sequelize models and start the server
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
