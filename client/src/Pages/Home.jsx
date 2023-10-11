import { Box, Flex, Heading } from '@chakra-ui/react';
import customFetch from '../utils/customFetch';
import { Post, SuggestedUsers } from '../Components';
import { setPost } from '../features/post/postSlice';
import { store } from '../store';
import { useSelector } from 'react-redux';

export const loader = async () => {
  try {
    const response = await customFetch('/posts/feed');
    store.dispatch(setPost(response.data.feedPosts));
    return null;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'Something went wrong';
    toast.error(errorMessage);
    return errorMessage;
  }
};
const Home = () => {
  const posts = useSelector((store) => store.post.posts);

  if (posts.length === 0) {
    return (
      <Box>
        <Heading>Follow some users to see feed</Heading>
      </Box>
    );
  }

  return (
    <Flex gap={10} alignItems={'flex-start'}>
      <Box flex={7}>
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </Box>

      <Box flex={3} display={{ base: 'none', md: 'block' }}>
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default Home;
