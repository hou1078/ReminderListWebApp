const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

//GET route, for login only forwardAuthenticated is accepted.
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));


// POST route ,passport set, local can be replace by 'facebok' etc.
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  })
);

// GET route, for logout.
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;

