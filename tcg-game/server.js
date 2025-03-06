const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// List of players waiting for a game
let waitingPlayers = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Matchmaking system: If a player is waiting, match them with the new player
  if (waitingPlayers.length > 0) {
    const opponent = waitingPlayers.pop();
    socket.emit('start-game', { opponent: opponent.id });
    io.to(opponent.id).emit('start-game', { opponent: socket.id });
  } else {
    waitingPlayers.push(socket);
    socket.emit('waiting', 'Waiting for an opponent...');
  }

  // Handle player moves
  socket.on('move', (move) => {
    console.log('Move received:', move);
    socket.broadcast.emit('opponent-move', move);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // Clean up the waiting players list if the player disconnects
    waitingPlayers = waitingPlayers.filter(player => player !== socket);
  });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});