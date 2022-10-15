var express         = require('express');
var app             = express();
var port            = process.env.PORT || 8080;
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var router          = express.Router();
var path            = require('path');
var appRoutes       = require('./app/routes/api')(router);


app.use(morgan("dev")); // Start login or request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); //server frontend view
app.use('/api', appRoutes); // Use the routes and use from /api file --> http://localhost:8080/api/*


//create connection to the database and check if there is a connection
mongoose.connect("mongodb://localhost:27017/yedy", function(err){
    if(err){
        console.log("MongoDB --> Not connected to the database " + err);
    }else{
        console.log("MongoDB --> Successfully connected to MongoDB");
    }
});

app.get('*', function(req,res){ //'/*'no matter what user does send them to index.html
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
    console.log("Server --> Server is running on port " + port);
});