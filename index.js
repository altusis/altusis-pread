var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var redis = require("redis"),
    client = redis.createClient();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



/*
io.on('connection', function(socket){
	console.log("hello from 1")
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/users/courses', function(req, res){
	res.json(["CSE111","CSE110"]);
});


app.get('/track/courses', function(req, res){
	//loop
	client.subscribe("CSE111");
});

app.post('/courses/follow', function(req, res){
	console.log(req.body)
	client.subscribe(req.body.course);
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});







client.on("message", function(channel, message){
  console.log(channel + ": " + message);
  io.emit('course '+channel, message);
});