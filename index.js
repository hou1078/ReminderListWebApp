//for creating the web server
const express = require("express");
// using passport
const app = express();
//handling file paths
const path = require("path");
//using EJS layouts with Expresss
const ejsLayouts = require("express-ejs-layouts");
//handling user sessions
const session = require("express-session");
const port = process.env.PORT || 3000;

//handling reminders and user authentication (logic, functions)
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

//Serving static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

//Configuring Express
app.use(express.urlencoded({ extended: false }));

//Integrating EJS layouts with Express
app.use(ejsLayouts);

//Setting EJS as the view engine for rendering templates.
app.set("view engine", "ejs");

//Configuring Express
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
//Importing Passport and the Local Strategy
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

// Middleware for express
app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Defining various routes related to reminders
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);

app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

//Defining routes related to user authentication
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);


app.use("/", indexRoute);
app.use("/auth", authRoute);


//Starting the Express server and listening on port 3001
app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/auth/login in your browser 🚀"
  );
});
