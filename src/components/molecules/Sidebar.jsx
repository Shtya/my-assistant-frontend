'use client';

import { Home, Hourglass, HeartPulse, Notebook, MoonStar, BookOpen, Trophy, ListIcon, Podcast, ChevronLeft, ChevronRight, Moon, Sun, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useValues } from '@/context/Context';
import { useLocale } from 'next-intl';
import { cn } from '@/helper/cn';

export default function Sidebar() {
    const { collapsed, setCollapsed, isMobile, setIsMobile } = useValues();
    const [theme, setTheme] = useState('light');

    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle('dark', saved === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };

    const pathname = usePathname(); // Get current path

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        router.replace(pathname, { locale: newLocale }); // Use current path instead of '/'
    };

    const handleAction = action => {
        if (action === 'toggleTheme') toggleTheme();
        if (action === 'toggleLocale') toggleLocale();
    };

    useEffect(() => {
        document.body.classList.toggle('sidebar-collapsed', collapsed === false);
    }, [collapsed]);

    // ✅ Dynamic menu items based on theme and locale
    const items = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Pomodoro', icon: Hourglass, href: '/pomodoro' },
        { label: 'Routine Tracker', icon: HeartPulse, href: '/routine-tracker' },
        { label: 'Note', icon: Notebook, href: '/note' },
        { divider: true },
        { label: 'Muslim Life', icon: MoonStar, href: '/islamic' },
        { label: 'English Lab', icon: BookOpen, href: '/english' },
        { label: 'My Fitness Journey', icon: Trophy, href: '/fitness-journey' },
        { label: 'To Do', icon: ListIcon, href: '/to-do-list' },
        { label: 'Podcasts', icon: Podcast, href: '/bodcast' },
        { divider: true },
        {
            label: locale === 'en' ? 'العربية' : 'English',
            icon: () => <span className='text-xs font-bold'>{locale === 'en' ? 'AR' : 'EN'}</span>,
            action: 'toggleLocale',
        },
        {
            label: theme === 'light' ? 'Dark Mode' : 'Light Mode',
            icon: theme === 'light' ? Moon : Sun,
            action: 'toggleTheme',
        },
    ];

    return (
        <>
            <div onClick={() => setCollapsed(!collapsed)} className={` ${isMobile ? "scale-1" : "scale-0"} duration-500 cursor-pointer group top-0 z-[10000000000] ltr:left-0 rtl:right-0 fixed bg-primary w-[30px] h-[30px] flex items-center justify-center`}>
                <Menu size={16} className=" group-hover:scale-[.95] duration-500 " />
            </div>
            
            <aside className={cn(`${isMobile ? ' left-0 ' : 'ltr:ml-[10px] rtl:mr-[10px]'}`, ' max-[700px]:-left-[70px]  shadow-inner bg-white/80  text-text-base rounded-lg border border-border/70', 'backdrop-blur-md fixed top-[16px] h-[calc(100vh-32px)] z-50 flex flex-col transition-all duration-300 ease-in-out', collapsed ? 'w-[60px]' : '!left-1 w-[260px]')}>
                <div className='flex items-center justify-between p-3 border-b border-border dark:border-gray-700'>
                    {!collapsed && <span className='text-sm font-bold'>Ahmed Assistant</span>}
                    <button onClick={() => setCollapsed(!collapsed)} className='p-1 rounded hover:bg-primary hover:text-white text-text-soft dark:text-gray-300'>
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className='overflow-y-auto flex-1'>
                    <ul className='p-2 space-y-1 text-sm font-medium'>{items.map((item, i) => (item.divider ? <hr key={i} className='my-2 border-border-muted' /> : <Item key={item.label} icon={item.icon} label={item.label} href={item.href} action={item.action} collapsed={collapsed} onAction={handleAction} />))}</ul>
                </nav>
            </aside>
        </>
    );
}

function Item({ icon: Icon, label, href, collapsed, pinned = false, action, onAction }) {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = pathname === href;

    const handleClick = () => {
        if (action) {
            onAction(action);
        } else {
            router.push(href);
        }
    };

    return (
        <li onClick={handleClick} className={cn('flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg transition-colors group', isActive ? 'bg-primary text-text-inverse' : 'text-text-muted hover:bg-background-muted hover:text-text-base')}>
            {typeof Icon === 'function' ? <Icon /> : <Icon size={18} className='shrink-0' />}
            {!collapsed && (
                <>
                    <span className='flex-1 truncate'>{label}</span>
                    {(pinned || isActive) && <span className='text-xs'>📌</span>}
                </>
            )}
        </li>
    );
}
