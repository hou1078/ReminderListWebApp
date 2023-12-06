let database = require("../models/userModel").database;

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let userId = req.user.id; // Assuming req.user is the logged-in user object
    let reminderToFind = req.params.id;
  
    // Find the user in the database array
    let user = database.find(user => user.id === userId);
  
    if (user && user.reminders) {
      let searchResult = user.reminders.find(reminder => reminder.id == reminderToFind);
      
      if (searchResult != undefined) {
        res.render("reminder/single-reminder", { reminderItem: searchResult });
      } else {
        res.render("reminder/index", { reminders: user.reminders });
      }
    } else {
      res.render("reminder/index", { reminders: [] });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
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



// create : async (req,res){
//   let reminder = {
//     id: database.req.user.reminders.length + 1,
//     title: req.body.title,
//     description: req.body.description,
//     completed: false,
//   };
// }


// //CASE 1 : User uploads image from computer 

// if (res.file){
//   reminder.cover = req.file.path;
// }

// //CASE 2 : USER CHECK THE RANDOM cover checkbox

// if (req.body.randomCover === ture){
//     fetch("http://api.unslash.com/photos/random")
//       .then(response => response.json())
//       .then(data => {
//         reminder.cover = data.urls[0].full
//       })
// }

// //CASE 3 : USER PASTE A URL