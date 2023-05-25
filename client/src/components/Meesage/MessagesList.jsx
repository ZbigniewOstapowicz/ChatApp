import React, { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";

import bemCssModule from "bem-css-modules";
import sound from "../../../audio/messageSound.ogg";
import socket from "../../helpers/socketConfig";
import ChatMeesageForm from "../ChatMeesageForm/ChatMeesageForm";

import { default as MessagesList } from "./MessagesListStyle.module.scss";
const style = bemCssModule(MessagesList);

const MeesagesList = ({ currentUser }) => {
  const messagesRef = useRef();
  const audio = new Audio(sound);
  const [writingMsg, setWritingMsg] = useState("");
  const {
    chatMessages,
    setFilterMessages,
    page,
    setPage,
    filterMessages,
    isLoading,
    scrollToBottom,
  } = useGetMessages(messagesRef);

  useEffect(() => {
    socket.on("user writeing", (msg) => {
      setWritingMsg(msg);
      setTimeout(() => {
        setWritingMsg("");
      }, 1500);
    });

    socket.on("sound message", () => {
      (() => audio.play())();
    });
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      scrollToBottom();
    }
  }, [messagesRef]);

  const scrollToLastPosition = () => {
    messagesRef.current.scrollTo({
      top: 10,
    });
  };

  const handelScroll = (e) => {
    if (!isLoading && messagesRef.current.scrollTop == 0) {
      setPage((page) => page + 1);
      scrollToLastPosition();
    }
  };

  const DisplayDate = ({ timeStamp }) => {
    const dateFetch = new Date(timeStamp);
    const dateNow = new Date(Date.now());

    const comperDate =
      dateNow.getFullYear() + dateNow.getMonth() + dateNow.getDate() ===
      dateFetch.getFullYear() + dateFetch.getMonth() + dateFetch.getDate() ? (
        <p
          className={style("timeStamp")}
        >{`${dateFetch.getHours()}:${dateFetch.getMinutes()}:${dateFetch.getSeconds()}`}</p>
      ) : (
        <p className={style("timeStamp")}>{`${dateFetch.getDate()}-${
          dateFetch.getMonth() + 1
        }-${dateFetch.getFullYear()} ${dateFetch.getHours()}:${dateFetch.getMinutes()}:${dateFetch.getSeconds()}`}</p>
      );

    return comperDate;
  };

  const listElement = chatMessages.map((item) =>
    item.user.name === currentUser.name ? (
      <li key={item._id} className={style("my-Msg")}>
        <p className={style("my-Msg--text")}>{item.msg}</p>
        <DisplayDate timeStamp={item.timeStamp} />
      </li>
    ) : (
      <li key={item._id} className={style("another-Msg")}>
        <div className={style("another-Msg--wrapper")}>
          <div
            className={style("another-Msg--user-icon")}
            style={{ background: item.user.color }}
          >
            {item.user.name[0]}
          </div>
        </div>
        <div>
          <p className={style("another-Msg--text")}>
            <span className={style("user-name")}> {item.user.name}: </span>
            {item.msg}
          </p>
          <DisplayDate timeStamp={item.timeStamp} />
        </div>
      </li>
    )
  );

  return (
    <main className={style()}>
      <div
        className={style("wrapper")}
        ref={messagesRef}
        onScroll={handelScroll}
      >
        <ul className={style("list")}>
          {isLoading ? <li>Loading</li> : null}
          {listElement}
          {writingMsg ? <li>{writingMsg}</li> : <li></li>}
        </ul>
      </div>
      <ChatMeesageForm
        currentUser={currentUser}
        filterMessages={filterMessages}
        setFilterMessages={setFilterMessages}
      />
    </main>
  );
};

export default MeesagesList;
