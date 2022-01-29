const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT;
dotenv.config({ path: './config.env' });
require("./DB/conn");


const courseRoute = require("./routes/courses");

// const Users = require('./model/userSchema');

app.use(cors());

app.use(express.json());
app.use(require('./router/auth'));
app.use("/api", courseRoute);


// const middleware = (req, res, next) => {
//     console.log("Hello my middleware");
//     next();
// }

app.get("/", (req, res) => {
    res.send("Hello World from app.js");
});

// app.get("/about", middleware, (req, res) => {
//     res.send("About World");
// });
app.get("/contact", (req, res) => {
    res.send("Contact World");
});
app.get("/signin", (req, res) => {
    res.send("SignIn World");
});
app.get("/signup", (req, res) => {
    res.send("SignUp World");
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));