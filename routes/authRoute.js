const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

//localhost:3001/auth/login
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", {layout:'login_layout'});
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);
router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("register", {layout:'login_layout'});
});

// POST route, for registering a new user.
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  // Validation
  if (!name || !email || !password || !password2) {
    res.render("register", {
      message: "Please enter all fields",
      layout:'login_layout'
    });
  }

  if (password !== password2) {
    res.render("register", {
      message: "Passwords do not match",
      layout:'login_layout'
    });
  }

  // Validation passed
  res.redirect("/auth/login");
});
// POST route, for login.
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

// Forgot password route
router.get("/forgot", (req, res) => {
  res.render("forgot", {layout:'login_layout'});
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/auth/login");
  });
});


module.exports = router;

