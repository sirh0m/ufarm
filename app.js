const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/db");
const passport = require("passport");


// express session
const expressSession = require("express-session")({
  secret: "moneys",
  resave: false,
  saveUninitialized: false,
});

// import the user model
const Registration = require("./models/User");

// setup database connections
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", function () {
    console.log("Connected to MongoDB");
});
// db.on("error", function (error) {
//     console.error(error);
// });

const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");
const foRoutes = require("./routes/farmeronedbRoutes");
const aoRoutes = require("./routes/aoRoutes");


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(expressSession);
app.use(express.json());


// passport configuration middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());


app.use("/", signupRoutes)
app.use("/", foRoutes)
app.use("/", authRoutes)
app.use("/", aoRoutes)


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/Signup", (req, res) => {
  res.render("signup");
});

app.get("/Loginform", (req, res) => {
  res.render("loginform");
});

app.get("/UrbanFarmerdb", (req, res) => {
  res.render("urbanfarmerdb");
});

// app.get("/AOdb", (req, res) => {
//   res.render("aodb");
// });


app.get("*", (req, res) => {
  res.send("404! Invalid url")
});

//sending files
// app.get("/signup", (req, res) => {
//   res.sendFile(__dirname + "/views/home");
// });

// app.post("/signup", (req, res) => {
//   console.log(req.body);
//   res.redirect("/login");
// })





app.listen(3000, () => console.log("Listening to port 3000"));
