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
    default: 'undone'
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true, autoIndex: false });

taskSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id;

    delete ret._id;
    delete ret.updatedAt;
    delete ret.__v;
    delete ret.createdBy;
    return ret;
  }
});

export const Task = mongoose.model('Task', taskSchema);
