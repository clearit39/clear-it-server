const Course = require("../model/coursesSchema");

exports.createCourse = (req, res) => {
  console.log("req.body:", req.body);
  const course = new Course(req.body);
  course.save((err, course) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(course);
  });
};

exports.getCourseById = (req, res, next, id) => {
  Course.findById(id)
    // .populate("postedBy", "_id name")
    .exec((err, course) => {
      if (err || !course) {
        return res.status(400).json({
          error: err,
        });
      }
      req.course = course;
      next();
    });
};

exports.getCourse = (req, res) => {
  return res.json(req.course);
};

exports.getAllCourses = (req, res) => {
  // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "courseDate";
  Course.find()
    .sort([[sortBy, "descending"]])
    // .limit(limit)
    .exec((err, courses) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(courses);
    });
};

exports.updateCourse = (req, res) => {
  Course.findByIdAndUpdate(
    { _id: req.course._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, course) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ course });
    }
  );
};

exports.deleteCourse = (req, res) => {
  let course = req.course;
  course.remove((err, deletedCourse) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ deletedCourse });
  });
};

exports.getAllCoursesByUser = (req, res) => {
  Course.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .exec((err, courses) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(courses);
    });
};

exports.updateCourseParticipants = (req, res) => {
  Course.findByIdAndUpdate(
    { _id: req.course._id },
    { $push: { courseParticipants: req.body.userMail } },
    { new: true, useFindAndModify: false },
    (err, course) => {
      if (err) {
        console.log("Error111:", error);
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ course });
    }
  );
};
