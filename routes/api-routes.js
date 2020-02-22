var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // GET route for getting all ideas that were starred
  app.get("/api/starred", function(req, res) {
    let query = {};
    if (req.user.id) {
      query.UserId = req.user.id;
    }

    db.Ideas.findAll({
      where: query,
      include: [db.Ideas] //not sure if this has to be db.Ideas or db.User
    }).then(function(dbIdeas) {
      res.json(dbIdeas);
    });
  });

  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // POST route for saving an Idea
  app.post("/api/saveIdea", function(req, res) {
    db.Idea.findAll({
      where: {
        api_id: req.body.api_id,
        UserId: req.user.id
      }
    }).then(function(data) {
      if (data.length === 0) {
        db.Idea.create({
          name: req.body.name,
          api_id: req.body.api_id,
          UserId: req.user.id
        })
          .then(function(dbIdea) {
            res.json(dbIdea);
          })
          .catch(function() {
            res.send({ error: "error saving idea" });
          });
      } else {
        res.send({ error: "idea already starred" });
      }
    });
  });

  // DELETE route for deleting a starred Idea
  app.delete("/api/starred/:id", function(req, res) {
    db.Idea.destroy({
      where: {
        api_id: req.params.id
      }
    }).then(function(dbIdea) {
      res.json(dbIdea);
    });
  });

  // Route for getting some data about the user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};