import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const useFollowUnFollow = (user) => {
  const { user: currentUser } = useSelector((store) => store.user); // logged in user
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);

  const handleFollowAndUnFollow = async () => {
    if (!currentUser) {
      toast.error('Please login to follow');
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      await customFetch(`/users/follow/${user._id}`);

      if (following) {
        toast.success(`Unfollowed ${user.username}`);
        user.followers.pop(); // update only front end
      } else {
        toast.success(`Following ${user.username}`);
        user.followers.push(currentUser?._id); // update only front end
      }
      setFollowing(!following);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowAndUnFollow, following, updating };
};

export default useFollowUnFollow;
