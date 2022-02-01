const Question = require('../model/testQuestionsSchema');

exports.createQuestion = (req, res) => {
	console.log('req.body:', req.body);
	const question = new Question(req.body);
	question.save((err, question) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(question);
	});
};

exports.getQuestionById = (req, res, next, id) => {
	Question.findById(id)
		// .populate("postedBy", "_id name")
		.exec((err, question) => {
			if (err || !question) {
				return res.status(400).json({
					error: err,
				});
			}
			req.question = question;
			next();
		});
};

exports.getAllQuestions = (req, res) => {
	Question.find().exec((err, questions) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json(questions);
	});
};

exports.updateQuestion = (req, res) => {
	Question.findByIdAndUpdate(
		{ _id: req.question._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, question) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			}
			res.json({ question });
		}
	);
};

exports.deleteQuestion = (req, res) => {
	let question = req.question;
	question.remove((err, deletedQuestion) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({ deletedQuestion });
	});
};
