// Updated Mongoose schema for boards > columns > cards > tasks
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  image: { type: String },
  attachments: [{ type: String }],
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [taskSchema],
  order: { type: Number, default: 0 }, // ✅ ordering
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [cardSchema],
  order: { type: Number, default: 0 }, // ✅ ordering
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columns: [columnSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Board || mongoose.model('Board', boardSchema);
