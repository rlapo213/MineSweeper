const express = require('express');
const { json } = require('express');
const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server,{
    pingTimeout: 1000,
});

var room=["room1","room2","room3"]

var CK=[0,0,0]

//cors setting 
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//app.use(express.static(__dirname + '/public'));

// localhost:3000서버에 접속하면 클라이언트로 파일을 열어줌
// app.get('/', function(req, res) {
//     res.sendFile('Chating App Server');
// });
  


io.on('connection' , function(socket) {

  socket.on('chat', function(data){
      console.log('message from Client: '+data.message)

      var rtnMessage = {
          message: data.message
      };

      // 클라이언트에게 메시지를 전송
      //.broadcase. 자신을 제외한 나머지 클라이언트에게 메세지 전송
      socket.broadcast.emit('chat', rtnMessage);
  });

  socket.on('MadeRoom',function(data){

    console.log('MADEROOM')

    socket.broadcast.emit('MadeRoom', data);
    socket.join(room[0]);
    
    CK[0]++
  })

  socket.on('JoinRoom',function(data){
    console.log('JoinRoom'+data.index)

    socket.join(room[data.index]);
    CK[0]++
    if(CK[0]==2){
    
    io.sockets.in(room[data.index]).emit('GAMESTART')
    console.log('GAMESTART')
    }
  })

  socket.on('MyInfo',function(data){

    console.log('MyInfo')
    console.log(data.tabledata)
    console.log(data.Minecount)

    socket.broadcast.to(room[0]).emit('OpponentInfo',data) 

  })

  socket.on('IWIN',()=>{

    console.log('IWIN')

    socket.broadcast.to(room[0]).emit('YOULOSE') 

  })
  socket.on('ILOSE',()=>{

    console.log('ILOSE')

    socket.broadcast.to(room[0]).emit('YOUWIN') 

  })
  


})

server.listen(3000, function() {
  console.log('socket io server listening on port 3000')
})