const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CoursesSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  courseImage: {
    type: String,
  },
  courseOrganizer: {
    type: String,
    // required: true,
  },
  courseParticipants: [
    {
      type: String,
      ref: "User",
    },
  ],
  courseStatus: {
    type: String,
    // required: true,
  },
  courseTags: {
    type: Array,
    // required: true,
  },
  courseVideoLink: {
    type: String,
    // required: true,
  },

});


module.exports = mongoose.model("Courses", CoursesSchema);
