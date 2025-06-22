'use client';
import { Toaster } from 'react-hot-toast';
import { useValues } from '@/context/Context';
import Sidebar from '@/components/molecules/Sidebar';

export default function NestedLayout({ children }) {
    const { collapsed, setCollapsed } = useValues();

    return (
        <div className='body relative duration-500  overflow-hidden container !px-0 flex min-h-screen bg-bg-2 text-text-white '>
            <div className="overlay fixed inset-0  ">
                <img className='bg-container w-full h-full object-cover ' src="/white-bg-2.jpg" />
                <span className='w-full h-full  z-[10] absolute inset-0 backdrop-blur-[6px] ' ></span>
            </div>

            <Sidebar />
            <main className={` relative ml-[70px] flex-1 transition-all  duration-300 rtl:pl-[10px] ltr:pr-[10px] w-full ${collapsed ? '!max-w-[calc(100%-60px)]' : '!max-w-[calc(100%-260px)]'} `}>{children}</main>
        </div>
    );
}
