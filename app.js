var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require("./db");
const router = express.Router();
const auth = require("./auth/verify-token");
/**
 * parse requests of content-type - application/json
 */
app.use(bodyParser.json());
/**
 * parse requests of content-type - application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);
app.use("/users", require("./routes/user_route"));
app.listen(8000);
console.log("Listening to PORT 8000");