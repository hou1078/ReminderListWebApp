const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

//------Welcome Router---------///
router.get("/", (req, res) => {
  res.send("welcome");
});


//-----------reminder dashboard------------//
router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders", {
    user: req.user,
  });
});

module.exports = router;
