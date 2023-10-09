import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const GlobalSocketContext = createContext();

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState();
  const currentUser = useSelector((store) => store.user.user);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      query: { userId: currentUser._id },
    });
    setSocket(socket);
    return () => socket && socket.close();
  }, [currentUser?._id]);

  return (
    <GlobalSocketContext.Provider value={{ socket }}>
      {children}
    </GlobalSocketContext.Provider>
  );
};
export const useGlobalSocketContext = () => useContext(GlobalSocketContext);
export default SocketContext;
