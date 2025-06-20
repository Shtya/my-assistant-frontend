import Button from '@/components/atoms/Button';
import { cn } from '@/helper/cn';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React from 'react';

export default function Header({ setShowCalendar, showCalendar, focusDate, setShowCreateDialog, handlePrevMonth, currentYear, currentMonth, handleNextMonth, dayNames, calendarDays, handleDateSelect }) {
    return (
        <div className='card flex relative z-[10]  mt-[-5px] !p-[20px] !flex-row !justify-between w-full items-center mb-6'>
            <h2 className='text-xl font-semibold'>🗓️ Daily Routine Tracker</h2>
            <div className=' relative flex items-center gap-2'>
                <button onClick={() => setShowCalendar(!showCalendar)} className='flex items-center gap-3 px-1 py-1 bg-white rounded-[8px] shadow-sm hover:shadow-md transition duration-200 border border-gray-200'>
                    {/* Date Box */}
                    <div className='w-[35px] h-[25px] relative overflow-hidden bg-white shadow-md rounded-[5px] cursor-pointer '>
                        <span className='bg-[#f5746f] w-full block absolute top-0  h-[7px] '> </span>
                        <span className='w-full text-sm flex absolute bottom-0  h-full  pt-[6px] left-0  items-center justify-center font-medium '> {focusDate.toLocaleDateString('en-US', { day: 'numeric' })}</span>
                    </div>

                    {/* Month and Year */}
                    <div className='flex flex-col'>
                        <span className='text-xs text-gray-500 leading-none'>{focusDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className='text-sm font-medium text-gray-900 leading-tight'>{focusDate.toLocaleDateString('en-US', { year: 'numeric' })}</span>
                    </div>
                </button>

                <Button onClick={() => setShowCreateDialog(true)} label='Add Routine' icon={<Plus size={16} />} color='primary' />
				
				{showCalendar && (
					<div className=' absolute right-0 top-[120%] !w-[300px] z-[1000] mb-4 bg-white p-4 rounded-lg shadow-md border border-gray-200'>
						<div className='flex justify-between items-center mb-2'>
							<button onClick={handlePrevMonth} className='p-1 rounded-full hover:bg-gray-100'>
								<ChevronLeft size={20} />
							</button>
							<h3 className='font-semibold'>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
							<button onClick={handleNextMonth} className='p-1 rounded-full hover:bg-gray-100'>
								<ChevronRight size={20} />
							</button>
						</div>
						<div className='grid grid-cols-7 gap-1'>
							{dayNames.map(day => (
								<div key={day} className='text-xs font-medium text-center py-1'>
									{day.substring(0, 3)}
								</div>
							))}
							{calendarDays.map((day, index) => (
								<button key={index} onClick={() => handleDateSelect(day)} className={cn('p-2 rounded-full text-sm', !day ? 'invisible' : day.getDate() === focusDate.getDate() && day.getMonth() === focusDate.getMonth() ? 'bg-blue-500 text-white' : day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100')} disabled={!day}>
									{day?.getDate()}
								</button>
							))}
						</div>
					</div>
				)}
            </div>

        </div>
    );
}
