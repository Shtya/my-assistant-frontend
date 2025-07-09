// models/Problem.js
import mongoose from 'mongoose'

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  solution: { type: String, required: true }, 
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  category: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const Problem = mongoose.models.Problem || mongoose.model('Problem', problemSchema)
export default Problem