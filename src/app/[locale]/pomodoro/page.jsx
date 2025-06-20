'use client';
import PomodoroClock from '@/components/pages/pomodor/PomodoroClock';
import FocusStatsCard from '@/components/pages/pomodor/FocusStatsCard';

export default function PomodoroApp() {
    return (
        <div className=' pomodoro-container gap-[20px] max-w-[1000px] mx-auto mt-[30px] flex flex-col items-center justify-start min-h-screen  text-black p-4'>
            <div className='w-full text-center mb-8'>
                <h1 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent'>FocusFlow Pomodoro</h1>
                <p className='mt-3 text-lg bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent'>Maximize your productivity with science-backed focus sessions</p>
            </div>
            <div className='flex flex-col w-full items-center justify-start gap-[20px]'>
                <PomodoroClock />
                <FocusStatsCard />
            </div>
        </div>
    );
}

{
    /* <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full '>
    <div className='flex items-center flex-col gap-4 w-full  '>
        <TaskList />
    </div>

    <div className='max-lg:order-[-1] flex items-center flex-col gap-4  '>
        <ProgressClock />
    </div>
</div> */
}
