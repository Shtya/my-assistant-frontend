import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NestedLayout from '@/components/molecules/NestedLayout';
import { GlobalProvider } from '@/context/Context';
import { Toaster } from 'react-hot-toast';
import { Tajawal, Open_Sans , Scheherazade_New , Amiri_Quran } from 'next/font/google';

// ✅ Load fonts with custom variables
const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700'], // adjust as needed
  display: 'swap',
});


const scheherazade = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri-quran',
});

// const amiriQuran = Amiri_Quran({
//   subsets: ['arabic'],
//   variable: '--font-amiri-quran',
//   weight: '400', // Amiri Quran has only one weight
//   display: 'swap',
// });

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '600', '700'], // adjust as needed
  display: 'swap',
});



export const metadata = {
    title: 'My Personal AI Assistant | Smart Daily Planner',
    description: 'A personal smart assistant to organize your day, manage tasks, set reminders, and stay on track with prayers and goals — all in one place.',
    openGraph: {
        title: 'My Personal AI Assistant | Smart Daily Planner',
        description: 'Your intelligent digital companion for managing tasks, daily goals, and prayer reminders. Simplify your life with a personal productivity brain.',
        url: 'https://myassistant.ai', // غيّر هذا للرابط الفعلي لاحقاً
        siteName: 'My Personal Assistant',
        images: [
            {
                url: '/auth.png',
                width: 1200,
                height: 630,
                alt: 'Personal AI Assistant Preview',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My Personal AI Assistant | Smart Daily Planner',
        description: 'Stay productive and spiritually connected with your personal AI assistant — organize your tasks, goals, and prayer times effortlessly.',
        images: ['/auth.png'],
    },
    icons: {
        icon: '/favicon.png', // This path is relative to the "public" folder
    },
};

export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={`${tajawal.variable} ${scheherazade.variable} ${openSans.variable}`} dir={locale == 'en' ? 'ltr' : 'rtl'}>
            <body className='scroll'>
                <Toaster />
                <NextIntlClientProvider locale={locale}>
                    <GlobalProvider>
                        <NestedLayout> {children} </NestedLayout>
                    </GlobalProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
