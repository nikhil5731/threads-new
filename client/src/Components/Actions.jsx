import { BsHeart } from 'react-icons/bs';
import { Heart, Comment, Share, Repost } from '../assets/icons';
import { Flex, Text, Box, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, addReply } from '../features/post/postSlice';
import customFetch from '../utils/customFetch';

const Actions = ({ post }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post.likes.includes(user?._id));

  const [isLiking, setIsLiking] = useState(false);
  const [replayText, setReplyText] = useState('');
  const [isReplaying, setIsReplying] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLikeAndUnLike = async () => {
    if (!user) {
      toast.error('You must be logged in to like the post');
      return;
    }

    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await customFetch.put(`/posts/like/${post._id}`);
      if (!liked) {
        dispatch(likePost({ postId: post._id, userId: user._id }));
      } else {
        dispatch(unlikePost({ postId: post._id, userId: user._id }));
      }
      setLiked(!liked);
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = async () => {
    if (!user) {
      toast.error('You must be logged in to like the post');
      return;
    }

    if (isReplaying) return;
    setIsReplying(true);
    try {
      const response = await customFetch.post(`/posts/reply/${post._id}`, {
        text: replayText,
      });
      dispatch(addReply({ postId: post._id, reply: response.data.reply }));
      toast.success('Replay posted successfully');
      onClose();
      setReplyText('');
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <Flex flexDirection={'column'}>
      <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
        <Heart
          liked={liked}
          setLiked={setLiked}
          handleLikeAndUnLike={handleLikeAndUnLike}
        />
        <Comment onOpen={onOpen} />
        <Repost />
        <Share />
      </Flex>
      <Flex gap={2} alignItems='center'>
        <Text color='grey.light' fontSize='sm'>
          {post.replies.length} replies
        </Text>
        <Box w={0.5} h={0.5} bg='grey.light'></Box>
        <Text color='grey.light' fontSize='sm'>
          {post.likes.length} likes
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder='Reply goes here'
                value={replayText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              size={'sm'}
              mr={3}
              onClick={handleReply}
              isLoading={isReplaying}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Actions;
