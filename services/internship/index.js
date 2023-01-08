const asyncHandler = require('express-async-handler')

const Internship = require('../../models/internshipModel')

var internshipSvc = {}

// @desc    Get internships
// @route   GET /api/internships
// @access  Private
internshipSvc.getInternships = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        companyName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

    console.log({...keyword})

  const internships = await Internship.find({ ...keyword });
  res.status(200).json(internships)
})

// @desc    Create internships
// @route   POST /api/internships
// @access  Private/Admin
internshipSvc.createInternships = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add all field')
  }

  const internship = await Internship.create({
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    stipend: req.body.stipend,
    url: req.body.url
  })

  res.status(200).json(internship)
})

// DESC => Get Internship by Id
// ROUTE => GET /api/internships/:id
// ACCESS => Private
internshipSvc.getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  res.json(internship);
});

// DESC => Update Internship by Id
// ROUTE => PUT /api/internships/:id
// ACCESS => Private/Admin
internshipSvc.updateProduct = asyncHandler(async (req, res) => {
  const {
    companyName,
    jobTitle,
    location,
    stipend,
    url
  } = req.body;

  const internship = await Internship.findById(req.params.id);

  if (internship) {
    internship.companyName = companyName || internship.companyName;
    internship.jobTitle = jobTitle || internship.jobTitle;
    internship.location = location || internship.location;
    internship.stipend = stipend || internship.stipend;
    internship.url = url || internship.url;

    const updatedInternship = await internship.save();
    res.status(201).json(updatedInternship);
  } else {
    res.status(404);
    throw new Error("Internship not found");
  }
});

// DESC => Delete Internship By Id
// ROUTE => DELETE /api/internhips/:id
// ACCESS => Private/Admin
internshipSvc.deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (internship) {
    await internship.deleteOne();
    res.status(200).send("Delete Successfully");
  } else {
    res.status(404);
    throw new Error("Internship not found");
  }
});



module.exports = internshipSvc;
