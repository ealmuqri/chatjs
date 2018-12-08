var http = require('http');

// //create a server object:
// var server = http.createServer(function (req, res) {
//     console.log('hit');
    
// res.write('Hello World!'); //write a response to the client
// res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

// var server = http.Server();
// server.listen(8080);
// const io = require("socket.io")(server);

// //listen on every connection


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        console.log('new message');
        
        io.sockets.emit('new_message', 'hoaaa');
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
