const express = require("express");
const router = express.Router();
const { ensureAuthenticated,ensuredAdmin } = require("../middleware/checkAuth");

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

//-----------admin dashboard------------//
router.get("/admin", ensuredAdmin, (req, res) => {
  const userSessions = req.user.sessions || [];
  res.render("admin", {
    user: req.user,
    sessions: userSessions,
  });
});


module.exports = router;
