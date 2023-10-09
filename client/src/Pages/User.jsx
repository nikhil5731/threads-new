import { useLoaderData } from 'react-router-dom';
import { Post, UserHeader, CreatePost } from '../Components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { setPost } from '../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/users/profile/${params.username}`);
    return { user: response.data.user };
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'Something went wrong';
    toast.error(errorMessage);
    return errorMessage;
  }
};

const User = () => {
  const { user } = useLoaderData();
  const [isPostLoading, setIsPostLoading] = useState(false);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const getPost = async () => {
    setIsPostLoading(true);
    try {
      const response = await customFetch(`/posts/get-posts/${user.username}`);
      dispatch(setPost(response.data.posts));
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

  if (!user) return <Heading>User not found</Heading>;

  return (
    <>
      <UserHeader user={user} />
      {isPostLoading ? (
        <div style={{ marginTop: '3rem' }} className='loading'></div>
      ) : posts.length === 0 ? (
        <h1 style={{ marginTop: '2rem' }}>User has no post</h1>
      ) : (
        posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      )}
      {user && <CreatePost />}
    </>
  );
};

export default User;
