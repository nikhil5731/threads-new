import {
  Button,
  FormControl,
  Heading,
  Stack,
  Avatar,
  Center,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { FormRow } from '../Components';
import { Form, useNavigation } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import usePreviewImg from '../hooks/usePreviewImg';

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const response = await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
    return null;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'Something went wrong';
    toast.error(errorMessage);
    return errorMessage;
  }
};

const UpdateProfile = () => {
  const { user } = useSelector((store) => store.user);
  const { name, username, email, bio, avatar } = user;

  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form className='form' method='post' encType='multipart/form-data'>
        <Heading fontSize={'4xl'} textAlign={'center'} mb={10}>
          User Profile Edit
        </Heading>
        <FormControl>
          <Stack direction={'row'} mb={7}>
            <Center>
              <Avatar size='xl' boxShadow={'md'} src={imgUrl || avatar} />
            </Center>
            <Center w='full'>
              <Flex flexDirection='column' gap={2}>
                <label htmlFor='avatar'>Select image file (max 0.5 MB)</label>
                <input
                  ref={fileRef}
                  hidden={true}
                  type='file'
                  id='avatar'
                  name='avatar'
                  className='form-input'
                  accept='image/*'
                  onChange={handleImageChange}
                />
                <Button w='full' onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
              </Flex>
            </Center>
          </Stack>
        </FormControl>

        <FormRow
          name='name'
          type='text'
          labelText='full name'
          defaultValue={name}
        />

        <FormRow
          name='username'
          type='text'
          labelText='user name'
          defaultValue={username}
        />

        <FormRow name='email' type='email' defaultValue={email} />

        <div className='form-row'>
          <label htmlFor={name} className='form-label'>
            bio
          </label>
          <input
            type='text'
            id='bio'
            name='bio'
            className='form-input'
            defaultValue={bio}
          />
        </div>

        <div className='form-row'>
          <label htmlFor={name} className='form-label'>
            password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-input'
          />
        </div>

        <Stack spacing={6} direction={'row'} mt={7}>
          <Button
            bg={'red.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            isDisabled={isSubmitting}
            type='submit'
            bg={'blue.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'blue.500',
            }}
          >
            {isSubmitting ? <Spinner /> : 'Submit'}
          </Button>
        </Stack>
      </Form>
    </Wrapper>
  );
};

export default UpdateProfile;

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  justify-content: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 450px;
    border-top: 5px solid #222;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    letter-spacing: 1px;
    margin-left: 0.25rem;
  }
`;
