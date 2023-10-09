import { Heading } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { Post } from '../Components';
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
    return <Heading>Follow some users to see feed</Heading>;
  }

  return (
    <>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </>
  );
};

export default Home;
