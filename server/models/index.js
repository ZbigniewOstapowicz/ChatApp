const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("debug", true);

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const DbConnect = mongoose.connection;
DbConnect.on('error',
  console.error.bind(console, 'MongoDB connection error:'));
DbConnect.once('open', () => {
  console.log('Connected to MongoDB');
});

const Meesages = require("./messages");
module.exports = Meesages;
