const http = require('./config/serwerConfig').http;
const io = require('./config/serwerConfig').io;
const { addMessage, getAllMessages, filterByName, filterByText, filterByDate } = require('./handlers/messages');

let chatUsers = {
  id: [],
};

io.on('connection', (socket) => {
  io.emit('get users list', chatUsers.id);

  socket.on('disconnect', () => {
    chatUsers.id = chatUsers.id.filter(user => socket.id !== user.id)
    io.emit('user disconnected', socket.id);
  });

  socket.on('get messages list', (page