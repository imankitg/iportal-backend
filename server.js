const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors')
const router = require('./routes') 

const port = process.env.PORT || 3000

connectDB()
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// app.use('/api/candidates', require('./routes/candidateRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))