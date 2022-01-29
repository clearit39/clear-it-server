var express = require("express");
var router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const {
  createCourse,
  getCourseById,
  getAllCourses,
  getCourse,
  updateCourseParticipants,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("courseId", getCourseById);

router.post("/createCourse/:userId", createCourse);

router.get("/courses", getAllCourses);
router.get("/course/:courseId", getCourse);

router.put(
  "/updateCourse/:courseId",
  // isAuthenticated,
  // isAdmin,
  updateCourse
);

router.put(
  "/updateCourseParticipants/:courseId/:userMail",
  getCourseById,
  updateCourseParticipants
);

router.delete(
  "/DeleteCourse/:courseId/:userId",
  isAuthenticated,
  isAdmin,
  deleteCourse
);

module.exports = router;
