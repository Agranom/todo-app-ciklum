import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [50, 'Title must be less then 50 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxLength: [255, 'Description must be less then 255 characters'],
  },
  status: {
    type: String,
    enum: ['undone', 'done'],
    default: 'undone',
  },
  createdBy: {
    type: String,
    required: [true, 'createdBy field is required'],
  },
}, { timestamps: true, autoIndex: false });

taskSchema.set('toObject', {
  transform: (doc, ret) => {
    const {
      _id, updatedAt, __v, createdBy, ...rest
    } = ret;

    return { id: _id, ...rest };
  },
});

export const Task = mongoose.model('Task', taskSchema);
