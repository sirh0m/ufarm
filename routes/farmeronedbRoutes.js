const express = require("express");
const router = express.Router();

const Registration = require("../models/User")

router.get("/farmerone", (req, res) => {
  res.render("farmeronedb");
});

router.get("/foredirect", (req, res) => {
  res.render("FOredirect");
});

router.post("/farmerone", async(req, res) => {
  console.log(req.body);
  try {
    const user = await new Registration(req.body);
    console.log('this is the new user', user)
    console.log(req.body.userid)
    let uniqueExist = await Registration.findOne({ userid: req.body.userid});
    console.log('this is the one from the db', uniqueExist)

    if (uniqueExist) {
      return res.status(400).send("this number is assigned");
    } else {
      await Registration.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        // res.redirect("/farmerone")
        res.send('this will be replaced with the redirected page')
      });
    }
  } catch (error) {
    res.status(400).send("failed to register");
    console.log(error);
  }

  // console.log(uniqueExist)

});

router.get("/fa-dash", (req, res) => {
  res.render("farmeronedb");
});


module.exports = router;