var express = require('express');
var router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const {
	getQuestionById,
	getAllQuestions,
	createQuestion,
	updateQuestion,
	deleteQuestion,
} = require('../controller/question');

const { getUserById } = require('../controller/users');

router.param('userId', getUserById);
router.param('questionId', getQuestionById);

router.post('/createQuestion', createQuestion);

router.get('/questions', getAllQuestions);

router.get('/question/:questionId', getQuestionById);

router.put('/updateQuestion/:questionId', updateQuestion);

router.delete('/deleteQuestion/:questionId/', deleteQuestion);

module.exports = router;
