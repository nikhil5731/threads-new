import {
  Avatar,
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Actions, Comment } from '../Components';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { setPost, removePost } from '../features/post/postSlice';
import { store } from '../store';
import verifiedLogo from '../assets/images/verified.png';

export const loader = async ({ params }) => {
  store.dispatch(removePost());
  try {
    const response = await customFetch(`/users/profile/${params.username}`);
    return { user: response.data.user };
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'Something went wrong';
    toast.error(errorMessage);
    return errorMessage;
  }
};

const SinglePost = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.post);

  const { user } = useLoaderData();
  const [isPostLoading, setIsPostLoading] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      if (!window.confirm('Are you sure you want to delete this post')) return;
      const response = await customFetch.delete(`/posts/${currentPost._id}`);
      toast.success('Post deleted successfully');
      navigate(`/${user.username}`);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    }
  };

  const getPost = async () => {
    setIsPostLoading(true);
    try {
      const response = await customFetch(`/posts/${postId}`);
      dispatch(setPost([response.data.post]));
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const currentPost = posts[0];

  if (!currentPost) return <div className='loading'></div>;

  if (isPostLoading) {
    return <div className='loading' style={{ marginTop: '3rem' }}></div>;
  }

  return (
    <>
      <Flex>
        <Link to={`/${user.name}`}>
          <Flex w={'full'} alignItems={'center'} gap={3}>
            <Avatar src={user.avatar} size={'md'} name={user.username} />
            <Flex alignItems={'center'}>
              <Text fontSize='sm' fontWeight='bold'>
                {user.name}
              </Text>
              <Image src={verifiedLogo} h={4} ml={4} />
            </Flex>
          </Flex>
        </Link>

        <Flex gap={4} alignItems='center'>
          <Text
            fontSize={'xs'}
            width={36}
            textAlign={'right'}
            color={'gray.light'}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))
              .split(' ')
              .slice(1)
              .join(' ')}{' '}
            ago
          </Text>
          {currentUser?._id === user._id && (
            <DeleteIcon cursor='pointer' size={20} onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>

      {/* POST DATA */}
      <Text my={3}>{currentPost.text}</Text>

      {currentPost.img && (
        <Box borderRadius={6} border='1px solid' borderColor='grey.light'>
          <Image src={currentPost.img} w='full' borderRadius={6} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>👋</Text>
          <Text color={'grey.light'}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      {currentPost.replies.map((reply, index) => {
        return (
          <Comment
            key={index}
            reply={reply}
            lastReply={index === currentPost.replies.length - 1}
          />
        );
      })}
    </>
  );
};

export default SinglePost;
