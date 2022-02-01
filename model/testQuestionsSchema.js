const mongoose = require('mongoose');
const testQuestionsSchema = new mongoose.Schema({
	qno: {
		type: Number,
	},
	title: {
		type: String,
		required: true,
	},
	options: {
		type: Array,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	examName: {
		type: String,
		required: true,
	},
	testName: {
		type: String,
		required: true,
	},
	subjectName: {
		type: String,
		required: true,
	},
});

const testQuestions = mongoose.model('TESTQUESTIONS', testQuestionsSchema);
module.exports = testQuestions;
