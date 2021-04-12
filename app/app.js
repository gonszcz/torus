const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const three = require('three');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/game.js', function(req, res) {
    res.sendFile(__dirname + '/game.js');
})

app.get('/three.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/three/build/three.min.js');
})

http.listen(3000, function() {
    console.log("Listening on port 3000");
});