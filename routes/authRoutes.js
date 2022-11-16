const { application } = require("express");
const express = require("express");
const router = express.Router();
const passport = require("passport");

const farmerOneReg = require("../models/User")

router.get("/login", (req, res) => {
  res.render("login");
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),(req, res) => {
    req.session.user = req.user;
    console.log(req.session.user.role)
    if(req.session.user.role == "Farmerone") {
      res.redirect("/foredirect");
    } else if (req.user.role == "Urban Farmer") {
      res.redirect("/ao");
    } else if (req.user.role == "Agricultural Officer") {
      res.redirect("/nn");
    } else {
      res.redirect("/");
    }
  }
);

module.exports = router;



