const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);


//设置端口9093
server.listen(9093);


//创建socket.io连接
io.on('connection', function (socket) {
    socket.emit('open', '已经连接成功')

  // 监听客户端send事件
  socket.on('sendServer', function (data) {
    socket.emit('sendClient', data)
  });

  // 当用户断开时执行此指令
  socket.on('disconnect', function () {
    console.log('用户退出')
  });
});

