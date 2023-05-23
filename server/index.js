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

  socket.on('get messages list', (skip) => {
    const socketTo = socket.id
    getAllMessages(parseInt(skip), socketTo);
  });

  socket.on('new chat message', (obj) => {
    addMessage(obj.user, obj.msg, obj.timeStamp);
    io.emit('new chat message', obj);
    socket.broadcast.emit('sound message')
  });

  socket.on('new user', (obj) => {
    chatUsers.id.push(obj);
    io.emit('new user', obj);
  });

  socket.on('filter meesages by name', (name, skip) => {
    filterByName(name, skip, socket.id)
  });

  socket.on('filter meesages by text', (text, skip) => {
    filterByText(text, skip, socket.id)
  });

  socket.on('filter meesages by date', (date, skip) => {
    filterByDate(date, skip, socket.id)
  });


  socket.on('user writeing', msg => {
    socket.broadcast.emit('user writeing', msg);
  })
});

http.listen(3100, () => {
  console.log('listening on *:3000');
});