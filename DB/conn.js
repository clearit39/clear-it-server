const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	})
	.then((e) => {
    console.log(`Connected to ${e.connections[0].name} DB`);
  })
	.catch((err) => console.warn(err));
