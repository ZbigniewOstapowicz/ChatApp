import { useEffect, useState } from "react";
import socket from "../helpers/socketConfig";

const useGetMessages = (messagesRef) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterMessages, setFilterMessages] = useState({ filterData: {} });

  useEffect(() => {
    socket.emit("get messages list", page);
    socket.on("get all messages", (messages) => {
      if (messages) {
        setChatMessages((prev) => [...messages, ...prev]);
        setIsLoading(false);
      }
    });
    socket.on("new chat message", (msg) => {
      setChatMessages((oldArray) => [...oldArray, msg]);
      scrollToBottom();
    });
  }, []);

  useEffect(() => {
    if (page > 1 && filterMessages.filterData === {}) {
      setIsLoading(true);
      socket.emit("get messages list", page);
    }
    else if (page > 1 && filterMessages.filterData) {
      if (chatMessages.length < 20) return;
      else {
        setIsLoading(true);
        socket.emit("filter messages", filterMessages.filterData, page);
      }
    }
  }, [page]);

  useEffect(() => {
    if (filterMessages.filterData) {
      chatMessagesDefaultValue();
      socket.emit("filter messages", filterMessages.filterData, 1);
    } else {
      setFilterMessages({ filterData: {} });
      chatMessagesDefaultValue();
      socket.emit("get messages list", 1);
    }
  }, [filterMessages]);

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
