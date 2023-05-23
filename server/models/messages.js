const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      }
    },
    msg: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: String,
      required: true,
    }
  },
);

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;