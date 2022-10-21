var User = require("../models/user");
var Form = require("../models/form");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var secret = "harrypotter";


module.exports = function (router) {
  /**************************** Route - FORMS ******************************************/

  // http://localhost:8080/api/forms
  router.post("/forms", function (req, res) {
    // res.send('Testing users route');

    var form = new Form();

    form.area = req.body.area;
    form.type = req.body.type;
    form.name = req.body.name;
    form.tema = req.body.tema;

    // res.json({
    //   area : req.body.area,
    //   responsive: req.body.responsive,
    //   name: req.body.name,
    //   tema: req.body.tema
    // });
    console.log(req.body);
    if (
      req.body.area == null ||
      req.body.name == null ||
      req.body.type == null ||
      req.body.tema == null
    ) {
      res.json({
        success: false,
        message: "Ensure completing all the fields!",
      });
    } else {
      form.save(function (err) {
        //check if there is an error
        if (err) {
          res.json({ success: false, message: "Complete all the fields!" });
          console.log(err);
        } else {
          res.json({ success: true, message: "Form created!" });
        }
      });
    }
  });

  /**************************** Route - USERS ******************************************/

  // http://localhost:8080/api/users
  router.post("/users", function (req, res) {
    //res.send('Testing users route');

    var user = new User();
    user.username = req.body.username; // take the request of saving username into user.username
    user.password = req.body.password;
    user.email = req.body.email;

    //if the stuff is not provided
    if (
      req.body.username == null ||
      req.body.username == "" ||
      req.body.password == null ||
      req.body.password == "" ||
      req.body.email == null ||
      req.body.email == ""
    ) {
      // check if username is undefined or submitted with blank
      res.json({
        success: false,
        message: "Ensure username, email and password were provided.",
      });
    } else {
      user.save(function (err) {
        //check if there is an error
        if (err) {
          //   res.send('Username or Email already exists!');
          res.json({
            success: false,
            message: "Username or Email already exists!",
          });
          console.log(err);
        } else {
          //   res.send("User created");
          res.json({ success: true, message: "User created!" });
        }
      });
    }
  });

  /**************************** Route - USER LOGIN ******************************************/

  //http://localhost:8080/api/authenticate
  router.post("/authenticate", function (req, res) {
    User.findOne({ username: req.body.username })
      .select("email username password")
      .exec(function (err, user) {
        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: "Could not authenticate user." });
        } else if (user) {
          if (req.body.password) {
            var validPassword = user.comparePassword(req.body.password);
          } else {
            res.json({ success: false, message: "No password provided." });
          }

          if (!validPassword) {
            res.json({
              success: false,
              message: "Could not authenticate password",
            });
          } else {
            var token = jwt.sign(
              { username: user.username, email: user.email },
              secret,
              { expiresIn: '24h' }
            ); //don't store password for security reasons
            res.json({
              success: true,
              message: "User authenticated!",
              token: token,
            });
          }
        }
      });
  });

  /**************************** Route - GET THE CURRENT USER ******************************************/

  // middleware ex press
  router.use(function (req, res, next) {
    //get it from request || get it from url || get it from headers

    var token = req.body.token || req.body.query || req.headers['x-access-token'];

    if (token) {
      //verify token
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          res.json({ success: false, message: "Token invalid!" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({ success: false, message: "No token provided!" });
    }
  });

  //could be the part where send to forms
  // http://localhost:8080/api/me
  router.post('/currentUser', function (req, res) {
    // res.send(req.decoded);
    res.send(req.decoded);
  });

  return router;
};
