var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(
    new LocalStrategy(