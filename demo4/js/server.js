var ws = require("nodejs-websocket")


var clientCount = 0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {    //连接后执行
  console.log("New connection")
  clientCount++;
  conn.name = "user" + clientCount
  var msg = {}
  msg.name = conn.name
  msg.msg = conn.name + "进入了"
  msg.type = "enter"
  broadCast(JSON.stringify(msg))
  conn.on("text", function (str) {    //接收到消息出发
    msg.msg = str
    msg.type = "text"
    broadCast(JSON.stringify(msg))
  })
  conn.on("close", function (code, reason) {  //连接断开后出发
    console.log("Connection closed")
    msg.type = "left"
    msg.msg = conn.name + "离开了"
    broadCast(JSON.stringify(msg))
  })
  conn.on("error", function (err) {     //异常时出发
    console.log("error")
    console.log(err)
  })
}).listen(8001)

function broadCast(str) {
  server.connections.forEach(function (connection) {
    connection.sendText(str)
  })
}