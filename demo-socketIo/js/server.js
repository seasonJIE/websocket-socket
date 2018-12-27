var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(8001);

var clientCount = 0

io.on('connection', function (socket) {
  clientCount++;
  socket.name = 'user' + clientCount
  io.emit('enter', {name: socket.name});     //用户连接成功时触发发送登陆消息
  socket.emit('enterSelf', {name: socket.name})
  socket.on('message', function (msg) {        //服务端接受消息，返回各个客户端消息
    io.emit('message', {name: socket.name, message: msg});
  });
  socket.on("disconnect", function () {       //用户断开连接时，触发离开消息
    io.emit('leave', {name: socket.name});
  })
});