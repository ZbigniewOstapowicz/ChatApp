const db = require('../models');
const io = require('../config/serwerConfig').io;

const PAGE_SIZE = 20;

exports.addMessage = async (user, msg, timeStamp) => {
  try {
    await db.create({
      user: {
        name: user.name,
        color: user.color
      },
      msg,
      timeStamp
    })
  }
  catch (e) {
    console.log(e)
  }
};

const filteringConditions = async (req, page, socket, PAGE_SIZE) => {
  // const messagesLength = await db.countDocuments(req);
  // const newSkip = messagesLength - (skip + PAGE_SIZE);
  // console.log(messagesLength, skip, newSkip)
  // switch (true) {
  // case (messagesLength > PAGE_SIZE && newSkip > PAGE_SIZE): {
  // const result = await db.find(req)
  // .skip(newSkip)
  // .limit(PAGE_SIZE)
  // io.to(socket).emit('get messages list', result);
  // console.log(result);
  // break;
  // }
  // case (messagesLength <= PAGE_SIZE): {
  // const result = await db.find(req)
  // .skip(0)
  // .limit(PAGE_SIZE)
  // io.to(socket).emit('get messages list', result);
  // console.log(result);
  // break;
  // }
  // case (newSkip <= PAGE_SIZE && newSkip > 0): {
  // const result = await db.find(req)
  // .skip(0)
  // .limit(PAGE_SIZE + newSkip)
  // io.to(socket).emit('get messages list', result);
  // console.log(result);
  // break;
  // }
  // case (newSkip < 0): {
  // return;
  // }
  // }
  // const messagesLength = await db.countDocuments(req);
  // const newSkip = messagesLength - (skip + PAGE_SIZE);

  let result;

  // if (messagesLength <= PAGE_SIZE) {
  //   result = await db.find(req).limit(PAGE_SIZE);
  // } else if (newSkip <= PAGE_SIZE && newSkip > 0) {
  //   result = await db.find(req).limit(PAGE_SIZE + newSkip);
  // } else if (newSkip > PAGE_SIZE) {
  //   result = await db.find(req).skip(newSkip).limit(PAGE_SIZE);
  // } else {
  //   return;
  // }
  result = await db.find(req)
    .sort({timeStamp:-1})
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .exec();
console.log(page, result);

  io.to(socket).emit('get messages list', result.reverse());
}

exports.getAllMessages = async (page, socket) => {
  try {

    // const messagesLenght = await db.countDocuments({});
    // const newSkip = messagesLenght - (skip + PAGE_SIZE);
    // switch (true) {
    //   case (messagesLenght > PAGE_SIZE && newSkip > PAGE_SIZE): {
    //     const result = await db.find({})
    //       .skip(newSkip)
    //       .limit(PAGE_SIZE)
    //     io.to(socket).emit('get messages list', result);
    //     break;
    //   }
    //   case (newSkip <= PAGE_SIZE && newSkip > 0): {
    //     const result = await db.find({})
    //       .skip(0)
    //       .limit(PAGE_SIZE + newSkip)
    //     io.to(socket).emit('get messages list', result);
    //     break;
    //   }
    //   case (newSkip < 0): {
    //     return;
    //   }
    // }
    filteringConditions(req = null, page, socket, PAGE_SIZE);

  }
  catch (e) {
    console.log(e)
  }
};

exports.filterByName = async (name, page, socket) => {
  try {
    // const messagesLenght = await db.countDocuments({ 'user.name': name })
    // let newSkip = messagesLenght - (skip + PAGE_SIZE)
    // switch (true) {
    //   case (messagesLenght > PAGE_SIZE && newSkip >= PAGE_SIZE): {
    //     const result = await db.find({ 'user.name': name })
    //       .skip(newSkip)
    //       .limit(PAGE_SIZE);
    //     io.to(socket).emit('get messages list', result);
    //     break;
    //   }
    //   case (newSkip < PAGE_SIZE && newSkip > 0): {
    //     const result = await db.find({ 'user.name': name })
    //       .skip(0)
    //       .limit(PAGE_SIZE + newSkip);
    //     io.to(socket).emit('get messages list', result);
    //     break;
    //   }
    //   case (newSkip < 0): {
    //     return;
    //   }
    // }
    const req = { 'user.name': name };
    filteringConditions(req, page, socket, PAGE_SIZE)
  }
  catch (err) {
    console.log(err)
  }
};

exports.filterByText = async (text, page, socket) => {
  try {
    const req = { 'msg': { $regex: new RegExp(text, 'i') } }
    filteringConditions(req, page, socket, PAGE_SIZE)
  }
  catch (err) {
    console.log(err)
  }
};

exports.filterByDate = async (date, page, socket) => {
  try {
    if (date.from && date.to) {
      // const result = await db.find({
      //   'timeStamp':
      //   {
      //     $gte: new Date(date.from).toISOString(),
      //     $lt: new Date(date.to).toISOString()
      //   }
      // })
      // console.log(new Date(date.from))
      // io.emit('get messages list', result);
      const req = {
        'timeStamp':
        {
          $gte: new Date(date.from).toISOString(),
          $lt: new Date(date.to).toISOString()
        }
      };
      filteringConditions(req, page, socket, PAGE_SIZE)
    }
    else if (date.from && !date.to) {
      // const result = await db.find({
      //   'timeStamp':
      //     { $gte: new Date(date.from).toISOString(), }
      // })
      // io.emit('get messages list', result);

      const req = {
        'timeStamp':
          { $gte: new Date(date.from).toISOString(), }
      }
      filteringConditions(req, page, socket, PAGE_SIZE)

    }
    else if (date.to && !date.from) {
      // const result = await db.find({
      //   'timeStamp':
      //   {
      //     $lt: new Date(date.to).toISOString()
      //   }
      // })
      // io.emit('get messages list', result);
      const req = {
        'timeStamp':
        {
          $lt: new Date(date.to).toISOString()
        }
      }
      filteringConditions(req, page, socket, PAGE_SIZE)

    }
  }
  catch (err) {
    console.log(err)
  }
};

// node.js db connection?