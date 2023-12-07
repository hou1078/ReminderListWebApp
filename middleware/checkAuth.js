module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      // Check if the user has the 'regular' role
      if (req.user.role === 'regular') {
        return next();
      } 
    }
    res.redirect('/auth/login');
  },
  ensuredAdmin: function (req, res, next) {
    if (req.isAuthenticated()) {
      // Check if the user has the 'admin' role
      if (req.user.role === 'admin') {
        return next();
      } 
    }
    res.redirect('/auth/login');
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/reminders');
  },
};
