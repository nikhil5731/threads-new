import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:5173',
    origin: 'https://threads-clone-app.onrender.com',
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = {}; //userId:socketId

export const getRecipientSocketId = (recipientId) => userSocketMap[recipientId];

io.on('connection', (socket) => {
  // console.log(`user connected, ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId != 'undefined') userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap)); // [1,2,3] - emit an event event

  socket.on('disconnect', () => {
    // lister for event
    // console.log(`user disconnected`);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, server, app };
