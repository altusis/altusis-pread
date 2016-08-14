var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/*
io.on('connection', function(socket){
	console.log("hello from 1")
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/
app.get('/', function(req, res){
  io.emit('course CSE111', 100);
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
