const express = require('express')
const router = require('express').Router()
const internshipSvc = require('../../services/internship')
const { protect, admin } = require('../../middleware/authMidddleware')

router.get('/', protect, internshipSvc.getInternships)
router.get('/:id', protect, internshipSvc.getInternshipById)

router.put('/:id', protect, admin, internshipSvc.updateProduct)
router.delete('/:id', protect, admin, internshipSvc.deleteInternship)
router.post('/', protect, admin, internshipSvc.createInternships)

// router.get("/profile", protect, userSvc.getUser);

module.exports = router
