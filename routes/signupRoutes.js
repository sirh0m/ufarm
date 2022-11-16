const express = require("express");
const router = express.Router();

// importing the model
const Registration = require("../models/User");


router.get("/Register", (req, res) => {
  res.render("signup");
});

router.post("/Register", async (req, res) => {
  // console.log(req.body);
  try {
    const user = new Registration(req.body);

    // console.log(user)
    await Registration.register(user, req.body.password, (error) => {
      if (error) {
        throw error
      }
      res.redirect("/home")
    });
  } catch (error) {
    res.status(400).send("details bounced");
    console.log(error);
    
  }
});

module.exports = router;

