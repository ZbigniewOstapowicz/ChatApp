import { useEffect, useState } from "react";
import socket from "../helpers/socketConfig";

const useGetMessages = (messagesRef) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterMessages, setFilterMessages] = useState({
    isFilter: null,
    data: {
      chatUser: "",
      message: "",
      date: {
        from: "",
        to: "",
      },
    },
  });

  useEffect(() => {
    socket.emit("get messages list", page);
    socket.on("get all messages", (messages) => {
      if (messages) {
        setChatMessages((prev) => [...messages, ...prev]);
        setIsLoading(false);
      }
    });
    console.log('render');
    socket.on("new chat message", (msg) => {
      setChatMessages((oldArray) => [...oldArray, msg]);
      scrollToBottom();
    });
  }, []);

  useEffect(() => {
    if (page > 1 && !filterMessages.isFilter) {
      setIsLoading(true);
      socket.emit("get messages list", page);
    } else if (page > 1 && filterMessages.isFilter) {
      if (chatMessages.length < 20) return;
      else {
        setIsLoading(true);
        socket.emit("filter messages", filterMessages.data, page);
      }
    }
  }, [page]);

  useEffect(() => {
    if (filterMessages.isFilter) {
      chatMessagesDefaultValue();
      socket.emit("filter messages", filterMessages.data, 1);
    }
    else if (filterMessages.isFilter === false) {
      chatMessagesDefaultValue();
      socket.emit("get messages list", 1);
      console.log('filter work')
      setFilterMessages({
        isFilter: null
      });
    }
  }, [filterMessages.isFilter]);

  const chatMessagesDefaultValue = () => {
    setChatMessages([]);
    setPage(1);
  };

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        behavior: "smooth",
        top: messagesRef.current.scrollHeight,
      });
    }
  };

  return {
    chatMessages,
    setFilterMessages,
    page,
    setPage,
    filterMessages,
    isLoading,
    scrollToBottom,
  };
};

export default useGetMessages;
