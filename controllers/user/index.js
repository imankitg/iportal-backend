const express = require('express')
const router = require('express').Router();
const userSvc = require('../../services/user')
const { protect } = require('../../middleware/authMidddleware')


router.post('/register', userSvc.registerUser);

router.post("/login", userSvc.loginUser);

router.get("/profile", protect, userSvc.getUser);

module.exports = router;