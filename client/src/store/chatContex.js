import React, { createContext, useState, useEffect } from 'react';

import socket from '../helpers/socketConfig';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    socket.on('get users list', (users) => {
      setChatUsers(users);
    });
    socket.on('new user', (user) => {
      setChatUsers(prevUser => [...prevUser, user]);
    });
  }, []);

  return (
    <StoreContext.Provider value={{
      chatUsers,
      setChatUsers,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider