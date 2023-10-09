import { Router } from 'express';
const router = Router();
import {
  createPostInput,
  validatePostIdParam,
  replyInput,
} from '../middleware/validationMiddleware.js';

import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getAllPosts,
} from '../controllers/postController.js';

router.route('/feed').get(getFeedPosts);

router.route('/get-posts/:username').get(getAllPosts);

router.route('/create').post(createPostInput, createPost);

router.route('/like/:postId').put(validatePostIdParam, likeUnlikePost);

router.route('/reply/:postId').post(replyInput, replyToPost);

router
  .route('/:postId')
  .get(validatePostIdParam, getPost)
  .delete(validatePostIdParam, deletePost);

export default router;
