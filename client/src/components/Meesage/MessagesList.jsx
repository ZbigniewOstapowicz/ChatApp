import React, { useEffect, useContext, useRef, useState, useCallback } from 'react';
import bemCssModule from 'bem-css-modules';
import sound from '../../../audio/messageSound.ogg';
import socket from '../../helpers/socketConfig';

import ChatMeesageForm from '../ChatMeesageForm/ChatMeesageForm';

import { default as MessagesList } from './MessagesListStyle.module.scss';
const style = bemCssModule(MessagesList);

const MeesagesList = ({ currentUser }) => {
  const messagesRef = useRef();
  const audio = new Audio(sound);
  const [writeingMsg, setWriteingMsg] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [filterMessages, setFilterMessages] = useState({ filterBy: '', filterData: {} })
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.emit('get messages list', page);

    socket.on('get messages list', messages => {
      if (messages) {
        setChatMessages(prev => [...messages, ...prev])
        setIsLoading(false);
      }
    })

    socket.on('new chat message', (msg) => {
      setChatMessages(oldArray => [...oldArray, msg]);
      scrollToBottom()
    });

    socket.on('user writeing', msg => {
      setWriteingMsg(msg);
      setTimeout(() => {
        setWriteingMsg('');
      }, 1500);
    });

    socket.on('sound message', () => {
      (() => audio.play())();
    });
  }, []);

  // useEffect(() => {
    // switch (true) {
      // case (page > 1 && !filterMessages.filterBy): {
        // setIsLoading(true);
        // socket.emit('get messages list', page);
        // break
      // }
      // case (page > 1 && filterMessages.filterBy === 'filterByName'): {
        // if (chatMessages.length < 20) return;
        // else {
          // setIsLoading(true);
          // socket.emit('filter meesages by name', filterMessages.filterData, skip);
        // }
        // break;
      // }
      // case (page > 1 && filterMessages.filterBy === 'filterByText'): {
        // if (chatMessages.length < 20) return;
        // else {
          // setIsLoading(true);
          // socket.emit('filter meesages by text', filterMessages.filterData, skip);
        // }
        // break;
      // }
      // case (page > 1 && filterMessages.filterBy === 'filterByDate'): {
        // if (chatMessages.length < 20) return;
        // else {
          // setIsLoading(true);
          // socket.emit('filter meesages by date', filterMessages.filterData, skip);
        // }
        // break;
      // }
    // }

  // }, [page]);

  useEffect(() => {
    switch (filterMessages.filterBy) {
      case 'reset':
        setFilterMessages({ filterBy: '', filterData: null });
        chatMessagesDefaultValue();
        socket.emit('get messages list', page);
        break;
      case 'filterByName':
        if (page < 1) {
          chatMessagesDefaultValue();
          socket.emit('filter meesages by name', filterMessages.filterData, page);
          break;
        }
        else {
          socket.emit('filter meesages by name', filterMessages.filterData, page);
          break
        }
      case 'filterByText':
        if (page < 1) {
          chatMessagesDefaultValue();
          socket.emit('filter meesages by text', filterMessages.filterData, page);
          break;
        }
        else {
          socket.emit('filter meesages by text', filterMessages.filterData, page);
          break
        }
      case 'filterByDate':
        if (page < 1) {
          chatMessagesDefaultValue();
          socket.emit('filter meesages by date', filterMessages.filterData, page);
          break;
        }
        else {
          socket.emit('filter meesages by date', filterMessages.filterData, page);
          break
        }
    }

  }, [filterMessages]);

  useEffect(() => {
    if (messagesRef.current) {
      scrollToBottom();
    }
  }, [messagesRef]);

  const chatMessagesDefaultValue = () => {
    setChatMessages([]);
    setSkip(0);
    setPage(1);
  }

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        behavior: "smooth",
        top: messagesRef.current.scrollHeight
      });
    }
  };

  const getMsg = () => {
    setPage(page => page + 1);
    scrollToLastPosition();
  };

  useEffect(() => {
    setSkip(chatMessages.length);
  }, [chatMessages])

  const scrollToLastPosition = () => {
    messagesRef.current.scrollTo({
      top: 10
    });
  }

  const handelScroll = (e) => {
    if (
      !isLoading && messagesRef.current.scrollTop == 0
    ) {
      getMsg();
    }
  }

  const DisplayDate = ({ timeStamp }) => {
    const dateFetch = new Date(timeStamp);
    const dateNow = new Date(Date.now());

    const comperDate = dateNow.getFullYear() + dateNow.getMonth() + dateNow.getDate() === dateFetch.getFullYear() + dateFetch.getMonth() + dateFetch.getDate()
      ? <p className={style('timeStamp')}>{`${dateFetch.getHours()}:${dateFetch.getMinutes()}:${dateFetch.getSeconds()}`}</p>
      : <p className={style('timeStamp')}>{`${dateFetch.getDate()}-${dateFetch.getMonth() + 1}-${dateFetch.getFullYear()} ${dateFetch.getHours()}:${dateFetch.getMinutes()}:${dateFetch.getSeconds()}`}</p>

    return comperDate
  }

  const listElement = chatMessages.map(item =>
    item.user.name === currentUser.name ?
      <li key={item._id} className={style('my-Msg')} >
        <p className={style('my-Msg--text')}>{item.msg}</p>
        <DisplayDate timeStamp={item.timeStamp} />
      </li> :
      <li key={item._id} className={style('another-Msg')}  >
        <div className={style('another-Msg--wrapper')}>
          <div className={style('another-Msg--user-icon')} style={{ background: item.user.color }}>{item.user.name[0]}</div>
        </div>
        <div>
          <p className={style('another-Msg--text')}>
            <span className={style('user-name')}> {item.user.name}: </span>
            {item.msg}</p>
          <DisplayDate timeStamp={item.timeStamp} />
        </div>
      </li>
  );

  return (
    <main className={style()} >
      <div className={style('wrapper')}
        ref={messagesRef}
        onScroll={handelScroll} >
        <ul className={style('list')}>
          {isLoading ? <li>Loading</li> : null}
          {listElement}
          {writeingMsg ? <li>{writeingMsg}</li> : <li></li>}
        </ul>
      </div>
      <ChatMeesageForm
        currentUser={currentUser}
        filterMessages={filterMessages}
        setFilterMessages={setFilterMessages}
      />
    </main>

  );
}

export default MeesagesList;