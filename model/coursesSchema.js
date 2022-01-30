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
  courseOrganizerId: {
    type: ObjectId,
    required: true,
  },
  courseSection: [
    {
      sectionName: {
        type: String,
      },
      sectionDescription: {
        type: String,
      },
      sectionImage: {
        type: String,
      },
      sectionVideos: [
        {
          videoName: {
            type: String,
          },
          videoDescription: {
            type: String,
          },
          videoLink: {
            type: String,
          },
          videoThumbnail: {
            type: String,
          },
        },
      ],
    },
  ],
  courseParticipants: [
    {
      type: String,
      ref: "User",
    },
  ],
	avgRating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0,
	},
	numOfRatings: {
		type: Number,
		default: 0,
	},
  courseType: {
    type: String,
  },
  courseStatus: {
    type: String,
    // required: true,
  },
  courseTags: {
    type: Array,
    // required: true,
  },
  courseDemoVideoLink: {
    type: String,
    // required: true,
  },

});





module.exports = mongoose.model("Courses", CoursesSchema);
