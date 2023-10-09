import { Router } from 'express';
const router = Router();
import {
  getCurrentUser,
  updateUser,
  followUnFollowUser,
  getUserProfile,
} from '../controllers/userController.js';
import { updateUserInput } from '../middleware/validationMiddleware.js';
import { authorizedPermission } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

router.route('/current-user').get(getCurrentUser);

router
  .route('/update-user')
  .patch(upload.single('avatar'), updateUserInput, updateUser);

router.route('/follow/:id').get(followUnFollowUser);

router.route('/profile/:query').get(getUserProfile);

export default router;
