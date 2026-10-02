const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    profile: {
      fname: String,
      lname: String,
      phone: String,
      address: String,
      url: String,
    },

    education: [
      {
        courseName: String,
        completionYear: String,
        college: String,
        percentage: String,
      },
    ],

    skills: [String],

    projects: [
      {
        projectName: String,
        techStack: String,
        description: String,
      },
    ],

    social: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);

