import React, { useState } from 'react';

import socket from '../../helpers/socketConfig';
import sendIcon from '../../image/send.svg';
import Emoji from '../Emoji/Emoji';
import Settings from '../Settings/Settings';

import bemCssModule from 'bem-css-modules';
import { default as ChatMeesageFormStyle } from './ChatMeesageFormStyle.module.scss';
const style = bemCssModule(ChatMeesageFormStyle);

const ChatMeesageForm = ({ currentUser, filterMessages, setFilterMessages }) => {

  const [message, setMessage] = useState('');

  const handelOnChangeMessage = (e) => {
    setMessage(e.target.value);
    socket.emit("user writeing", `${currentUser.name} pisze...`);
  }

  const handelSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      let msgObj = {
        _id: Math.round(Math.random() * 10000000000),
        user: currentUser,
        msg: message,
        timeStamp: new Date().toISOString()
      }
      setMessage('');
      socket.emit('new chat message', msgObj);
      socket.emit("user writeing")
    }
  };

  return (
    <section className={style()}>
      <Settings
        filterMessages={filterMessages}
        setFilterMessages={setFilterMessages}
      />
      <form className={style('form')} onSubmit={handelSendMessage}>
        <input type="text" value={message} onChange={handelOnChangeMessage} className={style('form-input')} />
        <button type="submit" className={style('form-button')}>
          <img src={sendIcon} alt="send icon" />
        </button>
      </form>
      <Emoji setMessage={setMessage} />
    </section>
  );
}

export default ChatMeesageForm;