import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import customFetch from '../utils/customFetch';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../features/post/postSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const CreatePost = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const MAX_CHAR = 500;
  const [remainingCharacters, setRemainingCharacters] = useState(MAX_CHAR);
  const imageRef = useRef(null);
  const { imgUrl, handleImageChange, setImgUrl } = usePreviewImg();
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useParams();

  const handleTextChange = async (e) => {
    const inputText = e.target.value;
    setPostText();
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingCharacters(0);
    } else {
      setPostText(inputText);
      setRemainingCharacters(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.post('/posts/create', {
        text: postText,
        img: imgUrl,
      });
      setImgUrl('');
      setPostText('');
      toast.success('post added successfully');
      onClose();
      if (username === user.username) {
        dispatch(addPost(response.data.post));
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        position='fixed'
        bottom={10}
        right={10}
        bg={useColorModeValue('grey.300', 'grey.dark')}
        onClick={onOpen}
        size={{ base: 'sm', md: 'md' }}
      >
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder='Post content goes here..'
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize='xs'
                fontWeight='bold'
                textAlign={'right'}
                m={'1'}
                color={'gray.800'}
              >
                {remainingCharacters}/{MAX_CHAR}
              </Text>

              <Input
                type='file'
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt='Selected img' />
                <CloseButton
                  onClick={() => {
                    setImgUrl('');
                  }}
                  bg={'gray.800'}
                  position={'absolute'}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleCreatePost}
              isLoading={isLoading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
