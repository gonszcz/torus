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

app.get('/WebGL.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/three/examples/js/WebGL.js');
})

app.get('/FBXLoader.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/three/examples/js/loaders/FBXLoader.js');
})

app.get('/OrbitControls.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/three/examples/js/controls/OrbitControls.js');
})

app.get('/fflate.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/three/examples/js/libs/fflate.min.js');
})

app.get('/fonts/helvetiker_regular.typeface.json', function(req, res) {
    res.sendFile(__dirname + '/node_modules/three/examples/fonts/helvetiker_regular.typeface.json');
})

app.get('/assets/BaseballIdle.fbx', function(req, res) {
    res.sendFile(__dirname + '/assets/BaseballIdle.fbx');
})

http.listen(3000, function() {
    console.log("Listening on port 3000");
});
