import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SingleSuggestedUser from './SingleSuggestedUser';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const SuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUser, setSuggestedUser] = useState([]);

  const getSuggestedUsers = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch('/users/get-suggested-users');
      setSuggestedUser(response.data.suggestedUsers);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSuggestedUsers();
  }, []);

  return (
    <>
      <Text fontWeight={'bold'} mb={4}>
        Suggested Users
      </Text>

      <Flex direction={'column'} gap={4}>
        {isLoading
          ? [1, 2, 3, 4, 5].map((_, i) => {
              return (
                <Flex
                  key={i}
                  gap={2}
                  alignItems={'center'}
                  p={'1'}
                  borderRadius={'md'}
                >
                  {/* avatar skeleton */}
                  <Box>
                    <SkeletonCircle size={'10'} />
                  </Box>
                  {/* username and fullname skeleton */}
                  <Flex w={'full'} flexDirection={'column'} gap={2}>
                    <Skeleton h={'8px'} w={'80px'} />
                    <Skeleton h={'8px'} w={'90px'} />
                  </Flex>
                  {/* follow button skeleton */}
                  <Flex>
                    <Skeleton h={'20px'} w={'60px'} />
                  </Flex>
                </Flex>
              );
            })
          : suggestedUser.map((user) => {
              return <SingleSuggestedUser key={user._id} user={user} />;
            })}
      </Flex>
    </>
  );
};

export default SuggestedUsers;
