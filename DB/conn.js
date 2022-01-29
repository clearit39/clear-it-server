const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	})
	.then(() => {
		console.log(`Connection Successfull`);
	})
	.catch((err) => console.warn(err));
