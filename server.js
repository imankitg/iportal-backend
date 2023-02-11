const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors')
const router = require('./routes') 

const port = process.env.PORT || 3000

connectDB()
const app = express()
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))