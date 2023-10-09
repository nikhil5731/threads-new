import { useState } from 'react';
import Actions from './Actions';
import { Flex, Avatar, Text, Divider } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar src={reply.userAvatar} size={'sm'} name={reply.name} />

        <Flex gap={1} w={'full'} flexDirection={'column'}>
          <Flex
            w={'full'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text fontSize={'sm'} fontWeight={'bold'}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>

      {!lastReply && <Divider />}
    </>
  );
};

export default Comment;
