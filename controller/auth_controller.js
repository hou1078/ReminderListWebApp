let database = require("../models/userModel").database;

let authController = {
  login: (req, res) => {
    res.render("login");
  },
  
  register: (req, res) => {
    res.render("register");
  },
  
  loginSubmit: (req, res) => {
    res.redirect("/login");
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
