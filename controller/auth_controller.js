let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    res.redirect("/dashboard");
  },

  registerSubmit: (req, res) => {
    let user = {
      id: database.users.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    database.users.push(user);
    res.render("auth/login");
  },
};

module.exports = authController;
