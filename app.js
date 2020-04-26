var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var db =require("./db")
const router = express.Router();
const session = require('express-session');
var multer = require('multer');
//var user = mongoose.model('user',user);
const MongoDBStore = require('connect-mongodb-session')(session);
const auth = require('./auth/verify-token');
const uuid = require('uuid/v4')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
//   var upload = multer({ storage: storage }).single('myFile')
//   app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send(file)
    
//   })
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/TrainingProjectDb',
    collection: 'users'
});
var path = require('path');

var hbs= require('express-handlebars');

app.engine('hbs',hbs({extname:'hbs',defaultLayout:'email',layoutsDir:__dirname + '/views/'}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use('/',router);
 app.use('/signup', require('./routes/RegisterRoute'));
 app.use('/users', auth, require('./routes/UserRoute'));
 app.use('/auth', require('./auth/index'));
 app.use('/post', require('./routes/PostsRoute'));
 app.use(session({
    secret: 'secret token',
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    store: store,
    name: 'session cookie name',
    genid: (req) => {
        return uuid();
}}));
app.set('view engine', 'hbs');
app.listen(8000);
console.log("Listening to PORT 8000");