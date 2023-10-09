import { Outlet, useNavigation, redirect } from 'react-router-dom';
import { Header } from '../Components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { store } from '../store';
import { setUser } from '../features/user/userSlice';

export const loader = async () => {
  try {
    const response = await customFetch('/users/current-user');
    store.dispatch(setUser(response.data.user));
    return null;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'Something went wrong';
    // toast.error(errorMessage);
    console.log('error', error);
    return redirect('/login');
  }
};

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      {isPageLoading ? <div className='loading'></div> : <Outlet />}
    </>
  );
};

export default HomeLayout;
