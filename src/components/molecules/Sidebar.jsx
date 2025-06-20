'use client';

import { useState, useEffect } from 'react';
import { Home, Inbox, Search, Settings, BookOpen, File, CheckSquare, BookMarked, Trash2, ChevronLeft, ChevronRight, User, Hourglass, HeartPulse, Notebook, MoonStar } from 'lucide-react';
import { cn } from '@/helper/cn';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useValues } from '@/context/Context';

const items = [
    { label: 'Home', icon: Home, href: '/' },
     { label: 'Pomodoro', icon: Hourglass, href: '/pomodoro' },
     { label: 'Routine Tracker', icon: HeartPulse , href: '/routine-tracker' },
     { label: 'Note', icon: Notebook, href: '/note' },
     { label: 'Muslim Life', icon: MoonStar, href: '/islamic' },
     { label: 'Search', icon: Search, href: '/search' },
     { label: 'Inbox', icon: Inbox, href: '/inbox' },
     { divider: true },
     { label: 'Getting Started', icon: File, href: '/getting-started' },
     { label: 'Words', icon: BookOpen, href: '/words' },
     { label: 'Personal Home', icon: User, href: '/personal-home' },
     { label: 'Reading List', icon: BookMarked, href: '/reading-list' },
     { label: 'Settings', icon: Settings, href: '/settings' },
     { label: 'Trash', icon: Trash2, href: '/trash' }];

export default function Sidebar() {
    const { collapsed, setCollapsed } = useValues();

    useEffect(() => {
        document.body.classList.toggle('sidebar-collapsed', collapsed === false);
    },
     [collapsed]);

    return (
        <aside className={cn('ml-[10px] bg-white/80 text-text-base shadow-md rounded-2xl border border-border/70', 'backdrop-blur-md fixed  top-[16px] h-[calc(100vh-32px)] z-50 flex flex-col transition-all duration-300 ease-in-out', collapsed ? 'w-[60px]' : 'w-[260px]')}>
            {/* Header */}
            <div className='flex  items-center justify-between p-3 border-b border-border'>
                {!collapsed && <span className='text-sm font-bold text-text-base'>Ahmed Assistant</span>}
                <button onClick={() => setCollapsed(!collapsed)} className='ml-auto p-1 rounded hover:bg-primary hover:text-white text-text-soft'>
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Nav items */}
            <nav className='overflow-y-auto flex-1'>
                <ul className='p-2 space-y-1 text-sm font-medium'>{items.map((item, i) => (item.divider ? <hr key={i} className='my-2 border-border-muted' /> : <Item key={item.href} icon={item.icon} label={item.label} href={item.href} pinned={item.pinned} collapsed={collapsed} />))}</ul>
            </nav>
        </aside>
    );
}

function Item({ icon: Icon, label, href, collapsed, pinned = false }) {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = pathname === href;

    return (
        <li onClick={() => router.push(href)} className={cn('flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg transition-colors group', isActive ? 'bg-primary text-text-inverse' : 'text-text-muted hover:bg-background-muted hover:text-text-base')}>
            <Icon size={18} className='shrink-0' />
            {!collapsed && (
                <>
                    <span className='flex-1 truncate'>{label}</span>
                    {(pinned || isActive) && <span className='text-xs'>📌</span>}
                </>
            )}
        </li>
    );
}
