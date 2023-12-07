let database = require("../models/userModel").database;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgs');
  },
  filename: function (req, file, cb) {
    let reminderId = req.body.id || Date.now();
    let fileExt = path.extname(file.originalname);
    cb(null, reminderId + fileExt);
  },
});

const upload = multer({ storage: storage });

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create", { reminders: req.user.reminders });
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/single-reminder", { reminderItem: searchResult });
  },

  
  create:(req, res) => {
    upload.single('photo')(req, res, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      let reminder = {
        cover: req.file ? req.file.path : null,
        id: req.user.reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
      };
      req.user.reminders.push(reminder);
      res.redirect("/reminders");
    })
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
  
    if (!searchResult) {
      res.status(404).send("Reminder not found");
      return;
    }
  
    res.render("reminder/edit", { reminderItem: searchResult });
  },
  

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    if (req.body.completed) {
      searchResult.completed = true;
    }else{
      searchResult.completed = false;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = req.user.reminders.indexOf(searchResult);
    req.user.reminders.splice(index, 1);
    res.redirect("/reminders");
  },
};



module.exports = remindersController;



