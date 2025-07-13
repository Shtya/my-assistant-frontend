// models/FAQ.js
import mongoose from 'mongoose'

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }, // Rich text with code support
  category: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  tag: [{ type: String }],  
  createdAt: { type: Date, default: Date.now }
});

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema)
export default FAQ