const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const Joi = require('joi')

var userSvc = {}

// @desc    Register new user
// @route   POST /api/user/login
// @access  Public
userSvc.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body
  console.log(name, email, password)

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //validation
  const requiredCredFormat = Joi.object({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['in'] } })
      .required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .required(),
  })

  const { error } = requiredCredFormat.validate(req.body)
  if (error) {
    res.status(400)
    return next(error)
  }

  // Check if user exists
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  Public
userSvc.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/user
// @access  Private
userSvc.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = userSvc
