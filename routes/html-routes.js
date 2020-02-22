var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    app.get("/", function(req, res) {
      // If the user already has an account send them to the members page
      if (req.user) {
        res.render("index");
      } else {
        res.render("signup");
      }
    });
  
    app.get("/login", function(req, res) {
      // If the user already has an account send them to the members page
      if (req.user) {
        res.render("index");
      } else {
        res.render("login");
      }
    });
  
    app.get("index", isAuthenticated, function(req, res) {
      res.render("signup");
    });
  
    app.get("/starred", isAuthenticated, function(req, res) {
      if (req.user) {
        res.render("starredIdeas");
      } else {
        res.render("signup");
      }
    });
  };