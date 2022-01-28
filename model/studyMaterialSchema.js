const mongoose = require('mongoose');
const studyMaterialSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
	},
	sname: {
		type: String,
	},
	id: {
		type: Number,
	},
	subthumbnail: {
		type: String,
	},
	lname: {
		type: String,
	},
});

const studyMaterial = mongoose.model('STUDYMATERIAL', studyMaterialSchema);
module.exports = studyMaterial;
