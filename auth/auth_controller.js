const express = require("express");
const router = express.Router();
const Users = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/index");
var sessions = require("express-session");

router.post("/login", function (req, res) {
  Users.findOne({ email: req.body.email })
    .select("+password")
    .then((user) => {
      if (!user) return res.status(401).send("No user found.");
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(404).send("Please enter valid password.");
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.expiresIn,
      });
      user.password = "";
      req.sessions = user;
      // req.sessions.id =sessionID;

      let Result = {
        auth: true,
        token: token,
        user: req.sessions,
        sessionID: req.sessions.id,
      };
      console.log(req.sessions);
      console.log(req.sessions.id);
      return res.status(200).send(Result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal server error!.");
    });
});

router.get("/logout", function (req, res) {
  Users.find(req.sessions)
    .then((user) => {
      if (user) {
        delete req.sessions;
        return res.status(200).send({ mesaage: "logout" });
      }
      return res.status(404).send({ message: "bhad me jaa" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal server error!.");
    });
});

module.exports = router;
