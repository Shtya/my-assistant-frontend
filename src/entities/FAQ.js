// models/FAQ.js
import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  tags: [{ type: String }],
  isImportant: { type: Boolean, default: false },
  position: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

faqSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);
export default FAQ;
