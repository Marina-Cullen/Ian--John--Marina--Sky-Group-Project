require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize.config');
const userRoutes = require('./routes/User.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
