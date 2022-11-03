const express = require('express');
const { WebSocketServer } = require('ws');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname, '/index.html');
});

const WebSocket = require('ws');

const socket = new WebSocketServer({port:5501});

const sockets = [];
socket.on('connection', (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to client");
   socket.on('close', () => 
   console.log("Disconnected to the client")
   );
   socket.on('message', (msg) => {
      const message = JSON.parse(msg);
      sockets.forEach((aSocket) => {
        aSocket.send(`${socket.nickname}: ${msg}`);
      })

      switch(message.type){
        case "new_message":
      sockets.forEach(aSocket => {
        aSocket.send(`${socket.nickname}: ${message.payload}`);
        });
        break;
        case "nickname":
          socket["nickname"] = message.payload;
          break;
      }
  });
 });

app.listen(5500);