// models/RelaxationMessage.ts

import { Schema, model } from 'mongoose';

const RelaxationMessageSchema = new Schema({
  text: { type: String, required: true }, // العبارة التي ستُعرض أثناء الراحة
  language: { type: String, enum: ['ar', 'en'], default: 'ar' }, // اللغة
  createdAt: { type: Date, default: Date.now }
});

export default model('RelaxationMessage', RelaxationMessageSchema);
