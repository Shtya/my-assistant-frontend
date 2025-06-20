import { Schema, model } from 'mongoose';

const PomodoroSchema = new Schema({
    // إعدادات المستخدم
    settings: {
        sessionLength: { type: Number, default: 25 }, // جلسة العمل بالدقائق
        breakLength: { type: Number, default: 5 }, // الاستراحة القصيرة
        longBreakLength: { type: Number, default: 15 }, // الاستراحة الطويلة
        dailyGoal: { type: Number, default: 8 }, // عدد الجلسات المستهدفة يومياً
        autoLongBreakEvery: { type: Number, default: 4 }, // كل كم جلسة يتم أخذ استراحة طويلة
        soundNotification: { type: Boolean, default: true }, // تشغيل صوت
        focusMode: { type: Boolean, default: false }, // إخفاء المشتتات
        blockScreenOnBreak: { type: Boolean, default: true }, // قفل الشاشة في الراحة

        // الإشعارات الذكية
        notifications: {
            enabled: { type: Boolean, default: true },
            type: { type: String, enum: ['sound', 'popup', 'both'], default: 'both' },
            onSessionEnd: { type: Boolean, default: true },
            onBreakEnd: { type: Boolean, default: true },
            customMessage: { type: String, default: 'انتهت الجلسة!' },
            selectedSoundId: { type: Schema.Types.ObjectId, ref: 'Sound', default: null },
            breakStartSoundId: { type: Schema.Types.ObjectId, ref: 'Sound', default: null },
            breakEndSoundId: { type: Schema.Types.ObjectId, ref: 'Sound', default: null },
        },

        // الرسالة الافتراضية التي تظهر في الراحة
        selectedRelaxationMessageId: {
            type: Schema.Types.ObjectId,
            ref: 'RelaxationMessage',
            default: null,
        },
    },

    // الجلسة الحالية
    currentSession: {
        mode: { type: String, enum: ['pomodoro', 'break'], default: 'pomodoro' },
        startedAt: { type: Date, default: null },
        endedAt: { type: Date, default: null },
        durationMinutes: { type: Number, default: 25 },
        isCompleted: { type: Boolean, default: false },
        wasInterrupted: { type: Boolean, default: false },
        interruptedAt: { type: Date, default: null },
        note: { type: String },
    },

    // سجل الجلسات
    sessionHistory: [
        {
            mode: { type: String, enum: ['pomodoro', 'break'] },
            startedAt: { type: Date },
            endedAt: { type: Date },
            durationMinutes: { type: Number },
            isCompleted: { type: Boolean },
            wasInterrupted: { type: Boolean },
            note: { type: String },
        },
    ],

    // إحصائيات ذكية
    stats: {
        daily: {
            date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
            totalSessions: { type: Number, default: 0 },
            totalFocusMinutes: { type: Number, default: 0 },
            totalBreakMinutes: { type: Number, default: 0 },
        },
        weekly: {
            startOfWeek: { type: Date },
            sessionsByDay: [
                {
                    date: { type: Date },
                    sessions: { type: Number },
                    focusMinutes: { type: Number },
                    breakMinutes: { type: Number },
                },
            ],
        },
    },

    // تواريخ الإنشاء والتحديث
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model('Pomodoro', PomodoroSchema);
