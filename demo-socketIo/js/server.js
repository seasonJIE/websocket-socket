var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(8001);

var clientCount = 0

io.on('connection', function (socket) {
  clientCount++;
  socket.name = 'user' + clientCount
  io.emit('enter', {name: socket.name});
  socket.emit('enterSelf', {name: socket.name})
  socket.on('message', function (msg) {
    io.emit('message', {name: socket.name, message: msg});
  });
  socket.on("disconnect", function () {
    io.emit('leave', {name: socket.name});
  })
});