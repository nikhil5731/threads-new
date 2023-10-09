import { Router } from 'express';
const router = Router();
import {
  sendMessage,
  getMessages,
  getConversations,
} from '../controllers/messageController.js';
import { validateOtherUserIdParam } from '../middleware/validationMiddleware.js';

router.route('/').post(sendMessage);

router.route('/conversations').get(getConversations);

router.route('/:otherUserId').get(validateOtherUserIdParam, getMessages);

export default router;
