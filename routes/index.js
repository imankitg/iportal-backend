const express = require('express')
const userController = require('../controllers/user')
const internshipController = require('../controllers/internship')

const router = express.Router()

router.use('/user', userController)
router.use('/internships', internshipController)

module.exports = router;
