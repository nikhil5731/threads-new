import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Message = ({ message, ownMessage }) => {
  const { selectedConversation } = useSelector((store) => store.chat);
  const currentUser = useSelector((store) => store.user.user);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Text maxWidth='330px' bg='blue.400' p={1} borderRadius={'md'}>
            {message.text}
          </Text>
          <Avatar src={currentUser.avatar} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          <Text
            maxWidth='330px'
            bg='gray.400'
            color='#222'
            p={1}
            borderRadius={'md'}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
