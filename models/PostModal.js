import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      maxLength: 500,
    },
    img: String,
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    replies: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        userAvatar: {
          type: String,
        },
        username: {
          type: String,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
