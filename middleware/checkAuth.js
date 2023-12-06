module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/auth/login");
    },
    forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/auth/login");
    },
  };
  


//   const authMiddleware = require('./path-to-auth-middleware');

// // 使用 ensureAuthenticated 中间件确保用户通过身份验证
// app.get('/secure-page', authMiddleware.ensureAuthenticated, (req, res) => {
//   // 处理已通过身份验证的用户
// });

// // 使用 forwardAuthenticated 中间件确保用户未通过身份验证
// app.get('/login', authMiddleware.forwardAuthenticated, (req, res) => {
//   // 处理未通过身份验证的用户
// });
