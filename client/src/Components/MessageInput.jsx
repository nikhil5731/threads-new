import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { updateLastMessageConversations } from '../features/chat/chatSlice';

const MessageInput = ({ setMessages }) => {
  const { selectedConversation } = useSelector((store) => store.chat);
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText) return;

    try {
      const response = await customFetch.post(`/messages`, {
        message: messageText,
        recipientId: selectedConversation.userId,
      });
      setMessages((message) => [...message, response.data.newMessage]);
      dispatch(
        updateLastMessageConversations({
          messageText,
          sender: response.data.newMessage.sender,
        })
      );
      setMessageText('');
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w='full'
          placeholder='Type a message'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSendMessage} cursor='pointer'>
          <IoSendSharp color='green.500' />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
