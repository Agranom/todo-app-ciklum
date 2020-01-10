import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 255,
  },
  status: {
    type: String,
    enum: ['undone', 'done'],
    default: 'undone',
  },
  createdBy: {
    type: String,
    required: true,
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
