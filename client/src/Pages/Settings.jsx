import { Text, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../features/user/userSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const freezeAccount = async () => {
    if (!window.confirm('Are you sure you want to freeze your account')) return;

    try {
      await customFetch.patch('/users/freeze');
      await customFetch('/auth/logout');
      dispatch(removeUser());
      navigate('/login');
      toast.success('Your account has been frozen!');
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Text my={1} fontWeight={'bold'}>
        Freeze Your Account
      </Text>
      <Text my={1}>You can unfreeze your account by logging in. </Text>
      <Button size={'sm'} colorScheme='red' onClick={freezeAccount}>
        Freeze
      </Button>
    </>
  );
};

export default Settings;
