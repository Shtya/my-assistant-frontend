// models/Sound.ts

import { Schema, model } from 'mongoose';

const SoundSchema = new Schema({
  name: { type: String, required: true },        // اسم الصوت (مثلاً: جرس، موجات، بيانو...)
  url: { type: String, required: true },         // رابط الصوت
  category: { type: String , default: 'sessionEnd' },
  createdAt: { type: Date, default: Date.now }
});

export default model('Sound', SoundSchema);
