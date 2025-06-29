'use client';
import { motion } from 'framer-motion';
import { Home, Hourglass, HeartPulse , Target , Notebook, MoonStar, BookOpen, Trophy, ListIcon, Podcast, ChevronLeft, ChevronRight, Moon, Sun, Menu, Expand, Minimize, Minimize2, Headphones, Maximize2, Languages, Shield, CircleDashed, Sunrise, Hand, Droplets, Sprout, HandHeart, Palmtree, MenuIcon, HelpCircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useValues } from '@/context/Context';
import { useLocale } from 'next-intl';
import { cn } from '@/helper/cn';

export default function Sidebar() {
    const { collapsed, setCollapsed, isMobile, setIsMobile, fullScreenMode, setFullScreenMode } = useValues();
    const [theme, setTheme] = useState('light');
    const [browserFullscreen, setBrowserFullscreen] = useState(false);

    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle('dark', saved === 'dark');
        }

        // Handle browser fullscreen change events
        const handleFullscreenChange = () => {
            setBrowserFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };

    const toggleContainerFullscreen = () => {
        setFullScreenMode(!fullScreenMode);
    };

    const toggleBrowserFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setBrowserFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                    setBrowserFullscreen(false);
                }
            }
        } catch (err) {
            console.error('Error toggling fullscreen:', err);
        }
    };

    const pathname = usePathname();

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        router.replace(pathname, { locale: newLocale });
    };

    const handleAction = action => {
        if (action === 'toggleTheme') toggleTheme();
        if (action === 'toggleLocale') toggleLocale();
        if (action === 'toggleContainerFullscreen') toggleContainerFullscreen();
        if (action === 'toggleBrowserFullscreen') toggleBrowserFullscreen();
    };

    useEffect(() => {
        document.body.classList.toggle('sidebar-collapsed', collapsed === false);
    }, [collapsed]);

    const items = [
        { label: 'Dashboard', icon: Home, href: '/' },
        { label: 'Focus Timer', icon: Hourglass, href: '/pomodoro' },
        { label: 'Habit Tracker', icon: HeartPulse, href: '/routine-tracker' },
        { label: 'Quick Notes', icon: Notebook, href: '/note' },
        { divider: true },
        { label: 'Spiritual Growth', icon: MoonStar, href: '/islamic' },
        { label: 'Language Learning', icon: BookOpen, href: '/english' },
        { label: 'Fitness Goals', icon: Trophy, href: '/fitness-journey' },
        { label: 'Tasks & Reminders', icon: ListIcon, href: '/to-do-list' },
        { label: 'Audio Library', icon: Headphones, href: '/bodcast' }, // Changed from Podcast to Headphones
        { divider: true },
        { label: 'Q&A Memory', icon: HelpCircleIcon, href: '/qa-memory' },
        {  label: 'Deep Work Mode',  icon: Target ,  href: '/focus'},

        { divider: true },
        {
            label: browserFullscreen ? 'Exit Fullscreen' : 'Full View',
            icon: browserFullscreen ? Minimize2 : Maximize2, // More modern icons
            action: 'toggleBrowserFullscreen',
        },
        {
            label: locale === 'en' ? 'Switch to Arabic' : 'التغيير إلى الإنجليزية',
            icon: Languages, // Using Languages icon instead of text
            action: 'toggleLocale',
        },
        {
            label: theme === 'light' ? 'Night Mode' : 'Day Mode',
            icon: theme === 'light' ? Moon : Sun,
            action: 'toggleTheme',
        },
    ];

    return (
        <>


            <aside className={cn(`${isMobile ? ' left-0 ' : 'ltr:ml-[10px] rtl:mr-[10px]'}`, ' max-[700px]:-left-[70px]  shadow-inner bg-white/80  text-text-base rounded-lg border border-border/70', 'backdrop-blur-md fixed top-[16px] h-[calc(100vh-32px)] z-50 flex flex-col transition-all duration-300 ease-in-out', collapsed ? 'w-[60px]' : '!left-1 w-[260px]')}>
                <div className='flex items-center justify-between p-3 border-b border-border dark:border-gray-700'>
                    {!collapsed && (
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className='flex items-center gap-2 px-1'>
                            <motion.div
                                animate={{ rotate: 10 }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    duration: 2,
                                }}>
                                <Sprout size={22} className='text-primary' />
                            </motion.div>
                            <span className='text-xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent'>Barakah</span>
                        </motion.span>
                    )}


                    <button onClick={() => setCollapsed(!collapsed)} className={` ${isMobile ? ` ${collapsed && "text-white !left-[60px] top-[-25px] relative duration-500 cursor-pointer group z-[10000000000]  bg-primary w-[30px] h-[30px] flex items-center justify-center"} ` : ""} p-1 rounded hover:bg-primary hover:text-white text-gray-700 dark:text-gray-300`}>
                        {collapsed ? ( !isMobile  ? <ChevronRight size={20} />  : <MenuIcon size={18} /> ) : <ChevronLeft size={20} />}
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
