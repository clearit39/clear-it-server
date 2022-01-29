var express = require("express");
var router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");

const {
  createCourse,
  getCourseById,
  getAllCourses,
  getCourse,
  updateCourseParticipants,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");
const { getUserById } = require("../controller/users");

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
