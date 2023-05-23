import { useEffect, useState } from 'react';
import socket from'../helpers/socketConfig';



const useGetMessages = () => {
const [loading , isLoading] = useState(true);
const [messages, setMessages]  = useState([]);
const [hasMore, setHasMore] = useState(false);

  useEffect(()=>{

  })
  // return (  );
}
 
export default useGetMessages;