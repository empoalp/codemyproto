
/*jshint laxcomma:true */

var codemyproto = require('./lib/codemyproto')
  , http = require('http');

var app = codemyproto();

http.createServer(app).listen(app.get('port'), function() {
  console.log('CodeMyProto listening on port ' + app.get('port'));
});

