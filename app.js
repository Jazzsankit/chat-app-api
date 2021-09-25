const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users=[];
//for runing the index.html file from public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
//   console.log('a user connected');
  console.log(socket.id);
  socket.on('user-joined',function(name){
      socket.broadcast.emit('joined-user',name);
      users.push({id:socket.id,name})
  })

  socket.on('send-chat',function(obj){
    socket.broadcast.emit('chats-send',obj);
  })

  socket.on('disconnect',function(){
    // console.log(socket.id);
    let user=users.filter(function(obj){
      return obj.id==socket.id;
    })
    // console.log(user);
    if(user.length)
    socket.broadcast.emit('left-chat',user[0].name)

    users=users.filter(function(obj){
      return obj.id!=socket.id
    })
  })

});

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on *:3000');
});