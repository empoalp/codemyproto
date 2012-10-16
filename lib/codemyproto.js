
/*jshint laxcomma: true, es5:true */

var express = require('express')
  , fs = require('fs')
  , ldap = require('ldapjs')
  , path = require('path');

exports = module.exports = createApplication;

//var ldapclient = exports.ldapclient = ldap.createClient({
//  url: 'http://ldapserverurl.com'
//});

function createApplication() {
  var app = express();    

  app.set('port', 5656);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.cookieSession({ secret: 'ooppo33pWw' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  // Login page
  app.get('/login', function(req, res) {
    res.render('login');
  });

  // Auth middleware
  app.use(function(req, res, next) {
    //res.redirect('/login');
    next();
  });

  app.post('/login', function(req, res) {
    var user = req.body.user.name
      , password = req.body.user.password
      , dn = 'uid=' + user + ',ou=Personal,o=TID';

      // Authenticate via LDAP
      ldapclient.bind(dn, password, function(err, ldapObj) {
        if (err) {
          console.log('errror');
          res.redirect('/login');
        } else {
          console.log('good!');
          res.redirect('/');
        }
      });
  });

  app.post('/upload', function(req, res) {
    
    //req.form.complete(function(err, fields, files) {
      var ins = fs.createReadStream(req.files.file.path);
      var ous = fs.createWriteStream(__dirname + '/images/' + req.files.file.name);
      util.pump(ins, ous, function(err) {
        res.end(req.files.file.name);
      });
    //});

  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  return app;
}
