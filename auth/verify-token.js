var jwt = require("jsonwebtoken");
var config = require("../config/index");
const usermodel = require("..//models/user_model");
var sessions = require("express-session");

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  var sessionID = req.headers["x-access-id"];
  console.log(req.sessions);
  if (!token && !sessionID) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  if (sessionID) {
    req.curentUser = user;
    next();
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(403)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    usermodel
      .findOne({ _id: req.userId })
      .then((user) => {
        if (!user)
          return res
            .status(403)
            .send({
              auth: false,
              message: "Token is not valid. Please provide valid token.",
            });

        req.curentUser = user;
        next();
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ auth: false, message: "Internal Server error." });
      });
  });
}

module.exports = verifyToken;
