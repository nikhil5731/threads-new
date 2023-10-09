import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Conversation', ConversationSchema);
