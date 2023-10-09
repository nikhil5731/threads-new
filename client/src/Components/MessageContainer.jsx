import {
  Avatar,
  Flex,
  Image,
  useColorModeValue,
  Text,
  Divider,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useSelector } from 'react-redux';
import verifiedLogo from '../assets/images/verified.png';

const MessageContainer = () => {
  const { selectedConversation } = useSelector((store) => store.chat);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((store) => store.user.user);

  const getMessages = async () => {
    if (selectedConversation.mock) {
      setMessages([]);
      return;
    }

    setMessagesLoading(true);
    try {
      const response = await customFetch.get(
        `/messages/${selectedConversation.userId}`
      );
      setMessages(response.data.messages);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedConversation.userId]);

  return (
    <Flex
      flex={7}
      bg={useColorModeValue('gray.200', 'grey.dark')}
      borderRadius={'md'}
      flexDirection={'column'}
      p={2}
    >
      {/* MESSAGE HEADER */}
      <Flex w='full' h={12} alignItems={'center'} gap={2}>
        <Avatar src={selectedConversation.userProfilePic} size='sm' />
        <Text display={'flex'} alignItems={'center'}>
          {selectedConversation.username}
          <Image src={verifiedLogo} w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />

      {/* MESSAGES */}
      <Flex
        flexDirection={'column'}
        gap={4}
        my={4}
        h='400px'
        overflowY={'auto'}
        p={2}
      >
        {messagesLoading
          ? [0, 1, 2, 3, 4].map((_, i) => {
              return (
                <Flex
                  key={i}
                  gap={2}
                  alignItems={'center'}
                  p={1}
                  borderRadius={'md'}
                  alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
                >
                  {i % 2 === 0 && <SkeletonCircle size={10} />}

                  <Flex flexDirection={'column'} gap={2}>
                    <Skeleton
                      alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
                      h='12px'
                      w='200px'
                    />
                    <Skeleton
                      alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
                      h='12px'
                      w='220px'
                    />
                    <Skeleton
                      alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
                      h='12px'
                      w='170px'
                    />
                  </Flex>

                  {i % 2 !== 0 && <SkeletonCircle size={10} />}
                </Flex>
              );
            })
          : messages.map((message) => {
              return (
                <Message
                  key={message._id}
                  message={message}
                  ownMessage={currentUser._id === message.sender}
                />
              );
            })}
      </Flex>

      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
