import { Button } from '@chakra-ui/react';
import { removeUser } from '../features/user/userSlice';
import customFetch from '../utils/customFetch';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await customFetch('/auth/logout');
    dispatch(removeUser());
    navigate('/login', { replace: true });
  };

  return (
    <Button size='sm' onClick={handleLogout}>
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutBtn;
