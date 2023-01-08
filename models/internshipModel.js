const mongoose = require('mongoose')

const internshipSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String, 
      required: true,
    },
    stipend: {
      type: Number,
    },
    url: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

internshipSchema.path('url').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('Internship', internshipSchema)