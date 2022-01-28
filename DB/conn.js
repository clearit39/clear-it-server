const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
    autoIndex: true,
}).then(() => {
    console.log(`Connection Successfull`);
}).catch((err) => console.warn(err));