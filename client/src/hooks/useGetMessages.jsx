import { useEffect, useState } from "react";
import socket from "../helpers/socketConfig";

const useGetMessages = (messagesRef) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterMessages, setFilterMessages] = useState({
    filterBy: "",
    filterData: {},
  });

  useEffect(() => {
    socket.emit("get messages list", page);
    socket.on("get messages list", (messages) => {
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
    switch (true) {
      case page > 1 && !filterMessages.filterBy: {
        setIsLoading(true);
        socket.emit("get messages list", page);
        break;
      }
      case page > 1 && filterMessages.filterBy === "filterByName": {
        if (chatMessages.length < 20) return;
        else {
          setIsLoading(true);
          socket.emit(
            "filter meesages by name",
            filterMessages.filterData,
            page
          );
        }
        break;
      }
      case page > 1 && filterMessages.filterBy === "filterByText": {
        if (chatMessages.length < 20) return;
        else {
          setIsLoading(true);
          socket.emit(
            "filter meesages by text",
            filterMessages.filterData,
            page
          );
        }
        break;
      }
      case page > 1 && filterMessages.filterBy === "filterByDate": {
        if (chatMessages.length < 20) return;
        else {
          setIsLoading(true);
          socket.emit(
            "filter meesages by date",
            filterMessages.filterData,
            page
          );
        }
        break;
      }
    }
  }, [page]);

  useEffect(() => {
    switch (filterMessages.filterBy) {
      case "reset":
        setFilterMessages({ filterBy: "", filterData: null });
        chatMessagesDefaultValue();
        socket.emit("get messages list", 1);
        break;
      case "filterByName":
        chatMessagesDefaultValue();
        socket.emit("filter meesages by name", filterMessages.filterData, 1);
        break;
      case "filterByText":
        chatMessagesDefaultValue();
        socket.emit("filter meesages by text", filterMessages.filterData, 1);
        break;
      case "filterByDate":
        chatMessagesDefaultValue();
        socket.emit("filter meesages by date", filterMessages.filterData, 1);
        break;
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
