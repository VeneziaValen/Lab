const express = require('express');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
var createError = require('http-errors');
var path = require('path');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');


var mysql = require('mysql2');
var connection = require('./lib/db');

const app = express();

//app.use(flash());
//app.use(expressValidator());




//Layout
app.use(layouts);
app.set('layout','layouts/main.ejs');

//Place layout on head
app.set("layout extractStyles", true);
//place layout on end
app.set("layout extractScripts", true);

//Set engine to EJS
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use static files
app.use('/public',express.static('public'));

//Routing
const testList = require('./routes/testList');
app.use('/testList', testList);

const testEdit = require('./routes/testEdit');
app.use('/testEdit', testEdit);

const soal = require('./routes/soal');
app.use('/soal', soal);

const soalList = require('./routes/soalList');
app.use('/soalList', soalList);

const soalPilihan = require('./routes/soalPilihan');
app.use('/soalPilihan', soalPilihan); 

const soalAdd = require('./routes/soalAdd');
app.use('/soalAdd', soalAdd);

const soalEdit = require('./routes/soalEdit');
app.use('/soalEdit', soalEdit);
 


 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
    next(createError(404));
  });
 
  // error handler
 // app.use(function(err, req, res, next) {
    // set locals, only providing error in development
   // res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
    //res.status(err.status || 500);
    //res.render('error');
  //});

  function verifyToken(req,res,next){
    //get header
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
  
      //split header
      const bearer = bearerHeader.split(" ");
  
      // get token
      const bearerToken = bearer[1];
  
      // set token
      req.token = bearerToken;
  
      //middleware next
      next();
  
  
  
    }else{
      //forbidden
      res.sendStatus(403);
    }
  }

const port = 9999
app.listen(process.env.PORT||9999);
console.log(`running port:${port}`);