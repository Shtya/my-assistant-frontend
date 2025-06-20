'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import DateSelector from '@/components/atoms/DateSelector';
import CircleProgress from '@/components/atoms/CircleProgress';
import ProgressSummary from '@/components/atoms/Progressbar2';

export default function FocusStatsCard() {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // This is static example data, but you can fetch it based on `selectedDate`
    const statsByDay = {
        completed: 5,
        total: 8,
        focusTime: 120,
        pomodoros: 4,
    };

    const { completed, total, focusTime, pomodoros } = statsByDay;
    const percentage = Math.round((completed / total) * 100);
    const progressColor = percentage >= 80 ? 'from-success to-green-400' : percentage >= 50 ? 'from-primary to-blue-400' : 'from-warning to-yellow-400';

    return (
        <div className='card space-y-5 w-full '>
            <h2 className='title-card'>📊 Focus Summary</h2>

            <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />

            <div className='flex flex-col items-center gap-4'>
                <h2 className='text-lg text-gray-600'>Fri, 20 Jun 2025</h2>
            </div>

            {/* <ProgressSummary completed={completed} total={total} percentage={percentage}  progressColor={progressColor} label='✅ Tasks Completed' /> */}

            <ProgressSummary completed={120} total={180} percentage={67}  progressColor='from-blue-400 to-blue-600' label='⏱ Focus Time (120 min)' />

            {/* Pomodoros */}
            <ProgressSummary completed={4} total={6} percentage={67}  progressColor='from-orange-400 to-orange-600' label='🍅 Pomodoros' />
        </div>
    );
}
