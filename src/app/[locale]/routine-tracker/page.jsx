'use client';
import { useState } from 'react';
import TimetableGrid from '@/components/pages/routine-tracker/TimetableGrid';
import { routinesData } from '@/helper/fakeData';

export default function Page() {

    const [routines, setRoutines] = useState( routinesData );
    const [open, setOpen] = useState(false);

    return (
        <div className='p-6 min-h-screen  text-text-base'>

            <TimetableGrid  open={open} setOpen={setOpen} routines={routines} setRoutines={setRoutines} />
        </div>
    );
}
