/* 
    Enhanced Features:
    
    1. Persist selected surah and ayah in localStorage
    2. Categorized mistakes by surah with filtering
    3. Added audio playback for ayahs
    4. Implemented quarters system with navigation
    5. Simplified statistics page
    6. Added voice note functionality
    7. Improved UI/UX throughout
*/

import { useState, useEffect } from 'react';
import { Mic as FaMicrophone, BookOpenCheck as FaQuran, Star as FaStar, StopCircle as FaStop, Play, Pause } from 'lucide-react';
// import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import dynamic from 'next/dynamic';
import { surahs } from '@/data/arrays';
import allVerses from '@/data/quran.json';
import SelectDefault from '@/components/atoms/SelectDefault';
import Input2 from '@/components/atoms/Input2';
import Button from '@/components/atoms/Button';

const MistakeChart = dynamic(() => import('./MistakeChart'), { ssr: false });

export default function EnhancedMistakeTracker() {
    const [selectedSurah, setSelectedSurah] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('lastSelectedSurah')) || 1;
        }
        return 1;
    });

    const [ayah, setAyah] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('lastSelectedAyah')) || 1;
        }
        return 1;
    });

    const [mistakes, setMistakes] = useState([]);
    const [ayaText, setAyaText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('add');
    const [tafsir, setTafsir] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recognitionResult, setRecognitionResult] = useState('');
    const [srsSchedule, setSrsSchedule] = useState({});
    const [bookmarks, setBookmarks] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [voiceNotes, setVoiceNotes] = useState({});
    const [quarters, setQuarters] = useState([]);
    const [currentQuarter, setCurrentQuarter] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [reviewedAnimation, setReviewedAnimation] = useState(null);
    const [selectedSurahFilter, setSelectedSurahFilter] = useState('all');

    // Persist selected surah and ayah
    useEffect(() => {
        localStorage.setItem('lastSelectedSurah', selectedSurah);
        localStorage.setItem('lastSelectedAyah', ayah);
    }, [selectedSurah, ayah]);

    // Load all data from localStorage on component mount
    useEffect(() => {
        const savedMistakes = localStorage.getItem('quranMistakes');
        const savedSRS = localStorage.getItem('srsSchedule');
        const savedBookmarks = localStorage.getItem('quranBookmarks');
        const savedVoiceNotes = localStorage.getItem('voiceNotes');

        if (savedMistakes) setMistakes(JSON.parse(savedMistakes));
        if (savedSRS) setSrsSchedule(JSON.parse(savedSRS));
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
        if (savedVoiceNotes) setVoiceNotes(JSON.parse(savedVoiceNotes));
    }, []);

    const [selectedSurahForQuarters, setSelectedSurahForQuarters] = useState(null);

    const getQuartersForSurah = (surahNumber) => {
        return allVerses
            .filter(quarter => {
                // نختار الأرباع التي تحتوي على رقم السورة المطلوبة
                return quarter.surahNumbers.includes(surahNumber);
            })
            .map(quarter => {
                // نبحث عن أول آية في هذا الربع تنتمي للسورة المطلوبة فقط
                const firstMatchingVerse = quarter.verses.find(verse => verse.surahNumber === surahNumber);

                return {
                    quarterNumber: quarter.quarterNumber,
                    surahNumber: firstMatchingVerse?.surahNumber,
                    ayah: firstMatchingVerse?.ayah,
                    text: firstMatchingVerse?.text,
                };
            })
            .filter(Boolean); // حذف النتائج الفارغة إن وجدت
    };

    // Save all data to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('quranMistakes', JSON.stringify(mistakes));
        localStorage.setItem('srsSchedule', JSON.stringify(srsSchedule));
        localStorage.setItem('quranBookmarks', JSON.stringify(bookmarks));
        localStorage.setItem('voiceNotes', JSON.stringify(voiceNotes));
    }, [mistakes, srsSchedule, bookmarks, voiceNotes]);

    const fetchAyahData = async () => {
        setIsLoading(true);
        try {
            // Fetch Arabic text
            const textResponse = await fetch(`https://api.alquran.cloud/v1/ayah/${selectedSurah}:${ayah}/ar.alafasy`);
            const textData = await textResponse.json();
            setAyaText(textData.data.text);

            // Fetch Tafsir
            setIsLoadingTafsir(true);
            const tafsirResponse = await fetch(`https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/ar-tafsir-ibn-kathir/${selectedSurah}/${ayah}.json`);
            const tafsirData = await tafsirResponse.json();
            setTafsir(tafsirData?.text || 'لا يوجد تفسير متوفر');
        } catch (error) {
            setTafsir('حدث خطأ أثناء تحميل التفسير');
        } finally {
            setIsLoading(false);
            setIsLoadingTafsir(false);
        }
    };

    const playAyahAudio = async () => {
        if (currentAudio) {
            currentAudio.pause();
            setCurrentAudio(null);
            setIsPlaying(false);
        }

        try {
            const response = await fetch(`https://api.alquran.cloud/v1/ayah/${selectedSurah}:${ayah}/ar.alafasy`);
            const json = await response.json();

            if (json.code === 200 && json.data.audio) {
                const audio = new Audio(json.data.audio);
                audio.onended = () => setIsPlaying(false);

                await audio.play();
                setCurrentAudio(audio);
                setIsPlaying(true);
            } else {
                alert('تعذر تحميل الصوت. تأكد من رقم السورة والآية.');
                console.error('API returned unexpected response:', json);
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            alert('حدث خطأ أثناء تشغيل الآية. يرجى المحاولة مرة أخرى.');
        }
    };

    const stopAudio = () => {
        if (currentAudio) {
            currentAudio.pause();
            setCurrentAudio(null);
            setIsPlaying(false);
        }
    };

    const addMistake = () => {
        if (!ayaText) return;

        const newMistake = {
            id: Date.now(),
            surah: selectedSurah,
            surahName: surahs.find(s => s.number === selectedSurah)?.name || '',
            ayah,
            text: ayaText,
            date: new Date().toISOString(),
            reviewCount: 0,
            lastReviewed: null,
            nextReviewDate: getNextReviewDate(1),
        };

        setMistakes([...mistakes, newMistake]);
        updateSrsSchedule(newMistake.id, 1);
        setAyaText('');
        setTafsir('');
    };

    const getNextReviewDate = interval => {
        const date = new Date();
        date.setDate(date.getDate() + interval);
        return date.toISOString();
    };

    const updateSrsSchedule = (mistakeId, interval) => {
        setSrsSchedule(prev => ({
            ...prev,
            [mistakeId]: getNextReviewDate(interval),
        }));
    };

    const incrementReview = (index, callback) => {
        const updatedMistakes = [...mistakes];
        const mistake = updatedMistakes[index];

        mistake.reviewCount += 1;
        mistake.lastReviewed = new Date().toISOString();

        let nextInterval;
        if (mistake.reviewCount === 1) nextInterval = 2;
        else if (mistake.reviewCount === 2) nextInterval = 4;
        else if (mistake.reviewCount === 3) nextInterval = 7;
        else nextInterval = 14;

        mistake.nextReviewDate = getNextReviewDate(nextInterval);
        updateSrsSchedule(mistake.id, nextInterval);

        setMistakes(updatedMistakes);
        setReviewedAnimation(mistake.id);
        setTimeout(() => {
            setReviewedAnimation(null);
            if (callback) callback();
        }, 1000);
    };

    const removeMistake = index => {
        const updatedMistakes = mistakes.filter((_, i) => i !== index);
        setMistakes(updatedMistakes);
    };

    const toggleBookmark = (surah, ayah) => {
        const bookmarkKey = `${surah}:${ayah}`;
        setBookmarks(prev => (prev.includes(bookmarkKey) ? prev.filter(b => b !== bookmarkKey) : [...prev, bookmarkKey]));
    };

    const startVoiceRecognition = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'ar-SA';
            recognition.interimResults = false;

            recognition.onstart = () => setIsRecording(true);
            recognition.onend = () => setIsRecording(false);
            recognition.onresult = event => {
                const transcript = event.results[0][0].transcript;
                setRecognitionResult(transcript);
            };

            recognition.start();
        } else {
            alert('Voice recognition not supported in your browser');
        }
    };

    const recordVoiceNote = (mistakeId, stop = false) => {
        if (stop) {
            setIsRecording(false);
            return;
        }

        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'ar-SA';
            recognition.interimResults = false;

            recognition.onstart = () => setIsRecording(true);
            recognition.onend = () => setIsRecording(false);
            recognition.onresult = event => {
                const transcript = event.results[0][0].transcript;
                setVoiceNotes(prev => ({
                    ...prev,
                    [mistakeId]: transcript,
                }));
            };

            recognition.start();
        } else {
            alert('Voice recording not supported in your browser');
        }
    };

    const playVoiceNote = text => {
        if ('speechSynthesis' in window) {
            if (currentAudio) {
                window.speechSynthesis.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.8;

            utterance.onend = () => setIsPlaying(false);

            setCurrentAudio(utterance);
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    const filteredMistakes = mistakes.filter(mistake => {
        // Filter by search term
        const matchesSearch = searchTerm === '' || mistake.text.includes(searchTerm) || mistake.surahName.includes(searchTerm) || (voiceNotes[mistake.id] && voiceNotes[mistake.id].includes(searchTerm));

        // Filter by surah
        const matchesSurah = selectedSurahFilter === 'all' || mistake.surah === parseInt(selectedSurahFilter);

        // Filter by status
        let matchesStatus = true;
        if (activeFilter === 'due') {
            matchesStatus = new Date(mistake.nextReviewDate) <= new Date();
        } else if (activeFilter === 'bookmarked') {
            matchesStatus = bookmarks.includes(`${mistake.surah}:${mistake.ayah}`);
        }

        return matchesSearch && matchesSurah && matchesStatus;
    });

    const getMistakesBySurah = surahNumber => {
        return mistakes.filter(m => m.surah === surahNumber);
    };

    const tabs = [
        { id: 'add', label: 'إضافة خطأ جديد', icon: "" },
        { id: 'review', label: 'مراجعة الأخطاء', icon: <img src='/sync.png' className='w-4 h-4 object-contain' /> },
        { id: 'stats', label: 'إحصائيات', icon: <img src='/bar-chart.png' className='w-4 h-4 object-contain' /> },
        { id: 'bookmarks', label: 'الآيات المفضلة', icon: <FaStar size={16} /> },
        { id: 'quarters', label: 'الأرباع', icon: <img src='/chart.png' className='w-4 h-4 object-contain' /> },
    ];

    const [showMore, setShowMore] = useState(false);
    const isLong = tafsir.length > 100;

    return (
        <div className='p-4 !mb-8 '>
            <div className='mb-4 overflow-auto flex justify-center py-2 flex-1 items-center'>
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`border-b pl-3 pr-2 text-nowrap py-2 flex items-center gap-1 ${activeTab === tab.id ? 'border-b-2 border-green-500 font-bold' : ''}`}>
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'add' && (
                <div className='card2 !px-4 !items-stretch'>
                    <h2 className='text-xl font-semibold mb-4'>إضافة خطأ جديد</h2>

                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <SelectDefault
                            cnLabel='text-right'
                            label='اختر السورة'
                            value={selectedSurah}
                            onChange={e => {
                                setSelectedSurah(e);
                                setAyah(1);
                            }}
                            options={surahs.map(surah => ({
                                value: surah.number,
                                label: `${surah.number}. ${surah.name} (${surah.verses} آيات)`,
                            }))}
                        />

                        <div>
                            <label className='text-right block mb-1'>رقم الآية (1 - {surahs.find(s => s.number === selectedSurah)?.verses})</label>
                            <div className='flex gap-2'>
                                <Input2 type='number' label={``} value={ayah} onChange={e => setAyah(Math.max(1, Math.min(parseInt(e) || 1, surahs.find(s => s.number === selectedSurah)?.verses || 1)))} onEnter={fetchAyahData} />
                                <button onClick={() => toggleBookmark(selectedSurah, ayah)} className={`w-11 h-9 flex items-center justify-center rounded hover:bg-yellow-500 hover:text-white duration-300 ${bookmarks.includes(`${selectedSurah}:${ayah}`) ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`} title='إضافة إلى المفضلة'>
                                    <FaStar size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-2 -mb-4'>
                        <Button loading={isLoading} label='عرض الآية' onClick={fetchAyahData} />
                        <Button
                            cn='flex items-center gap-1'
                            color={!isPlaying ? 'primary' : 'error'}
                            label={
                                isPlaying ? (
                                    <>
                                        <Pause size={16} /> إيقاف التشغيل
                                    </>
                                ) : (
                                    <>
                                        <Play size={16} /> سماع الآية
                                    </>
                                )
                            }
                            onClick={isPlaying ? stopAudio : playAyahAudio}
                        />
                        <Button
                            color={!isRecording ? 'black' : 'red'}
                            label={
                                isRecording ? (
                                    <>
                                        <FaStop size={16} /> جارٍ التسجيل
                                    </>
                                ) : (
                                    <>
                                        <FaMicrophone size={16} /> التقييم الصوتي
                                    </>
                                )
                            }
                            onClick={startVoiceRecognition}
                        />
                    </div>

                    {recognitionResult && (
                        <div className='-mb-4 mt-8 p-3 bg-gray-100 rounded'>
                            <h4 className='font-bold mb-1'>نتيجة التسجيل:</h4>
                            <p>{recognitionResult}</p>
                        </div>
                    )}

                    {ayaText && (
                        <div className='mt-8 p-4 bg-gray-100 rounded'>
                            <h3 className='text-lg font-medium'>
                                سورة {surahs.find(s => s.number === selectedSurah)?.name} - آية {ayah}
                            </h3>

                            <div className='grid grid-cols-1  gap-4'>
                                <div>
                                    <p className='quran text-right text-2xl mb-4 leading-loose'>{ayaText}</p>
                                </div>

                                <div className='border-border border-t pt-3'>
                                    <h4 className='font-bold mb-2'>التفسير:</h4>
                                    <div className='text-gray-700'>
                                        <p className={`${!showMore && isLong ? 'line-clamp-1' : ''}`}>{isLoadingTafsir ? 'جارٍ تحميل التفسير...' : tafsir}</p>

                                        {!isLoadingTafsir && isLong && (
                                            <button onClick={() => setShowMore(!showMore)} className='text-green-600 mt-1 text-sm hover:underline'>
                                                {showMore ? 'إظهار أقل' : 'إظهار المزيد'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {ayaText && <Button cn='mt-4' color='red' label='إضافة إلى الأخطاء' onClick={addMistake} />}
                </div>
            )}

            {activeTab === 'review' && (
                <div className='!px-4 card2'>
                    <div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
                        <h2 className='text-xl flex-1 text-primary font-semibold'>الأخطاء المحفوظة ({filteredMistakes.length})</h2>

                        <div className='flex flex-1 w-full  gap-2'>
                            <SelectDefault
                                cn='min-w-[150px]'
                                value={selectedSurahFilter}
                                onChange={setSelectedSurahFilter}
                                options={[
                                    { value: 'all', label: 'كل السور' },
                                    ...surahs
                                        .filter(s => mistakes.some(m => m.surah === s.number))
                                        .map(s => ({
                                            value: s.number,
                                            label: s.name,
                                        })),
                                ]}
                            />

                            <SelectDefault
                                cn='min-w-[150px]'
                                value={activeFilter}
                                onChange={setActiveFilter}
                                options={[
                                    { value: 'all', label: 'الكل' },
                                    { value: 'due', label: 'للمراجعة' },
                                    { value: 'bookmarked', label: 'المفضلة' },
                                ]}
                            />
                        </div>
                    </div>

                    {mistakes.length === 0 ? (
                        <p className='text-gray-500 text-center py-8'>لا توجد أخطاء مسجلة</p>
                    ) : filteredMistakes.length === 0 ? (
                        <p className='text-gray-500 text-center py-8'>لا توجد أخطاء تطابق بحثك</p>
                    ) : (
                        <div className='space-y-6'>
                            {filteredMistakes.map((mistake, index) => (
                                <MistakeCard key={mistake.id} mistake={mistake} index={index} incrementReview={incrementReview} removeMistake={removeMistake} isBookmarked={bookmarks.includes(`${mistake.surah}:${mistake.ayah}`)} toggleBookmark={toggleBookmark} recordVoiceNote={recordVoiceNote} voiceNote={voiceNotes[mistake.id]} isRecording={isRecording} reviewedAnimation={reviewedAnimation === mistake.id} playVoiceNote={playVoiceNote} isPlaying={isPlaying} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'stats' && (
                <div className='card2'>
                    <h2 className='text-xl font-semibold mb-6'>إحصائيات الحفظ</h2>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                        <StatCard title='إجمالي الأخطاء' value={mistakes.length} color='blue' />
                        <StatCard title='الأخطاء المكررة' value={mistakes.filter(m => m.reviewCount > 0).length} color='green' />
                        <StatCard title='للمراجعة اليوم' value={mistakes.filter(m => new Date(m.nextReviewDate) <= new Date()).length} color='yellow' />
                    </div>

                    <div className='mb-8'>
                        <h3 className='font-bold mb-4'>توزيع الأخطاء حسب السور</h3>
                        <div className='h-fit'>
                            <MistakeChart mistakes={mistakes} surahs={surahs} />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <TopList
                            title='أكثر الأخطاء تكراراً'
                            items={[...mistakes]
                                .sort((a, b) => b.reviewCount - a.reviewCount)
                                .slice(0, 5)
                                .map(m => ({
                                    title: `${m.surahName} آية ${m.ayah}`,
                                    subtitle: `تمت المراجعة ${m.reviewCount} مرة`,
                                }))}
                        />

                        <TopList
                            title='الأخطاء حسب السور'
                            items={surahs
                                .filter(s => mistakes.some(m => m.surah === s.number))
                                .sort((a, b) => getMistakesBySurah(b.number).length - getMistakesBySurah(a.number).length)
                                .slice(0, 5)
                                .map(s => ({
                                    title: `سورة ${s.name}`,
                                    subtitle: `${getMistakesBySurah(s.number).length} خطأ`,
                                }))}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'bookmarks' && (
                <div className='card2'>
                    <h2 className='text-xl font-semibold mb-6'>الآيات المفضلة ({bookmarks.length})</h2>

                    {bookmarks.length === 0 ? (
                        <p className='text-gray-500 text-center py-8'>لا توجد آيات مفضلة</p>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {bookmarks.map((bookmark, index) => {
                                const [surahNum, ayahNum] = bookmark.split(':').map(Number);
                                const surahName = surahs.find(s => s.number === surahNum)?.name || '';
                                const ayahText = mistakes.find(m => m.surah === surahNum && m.ayah === ayahNum)?.text || '';

                                return (
                                    <div key={index} className='p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition'>
                                        <div className='flex justify-between items-center mb-2'>
                                            <h3 className='font-medium'>
                                                سورة {surahName} - آية {ayahNum}
                                            </h3>
                                            <button onClick={() => toggleBookmark(surahNum, ayahNum)} className='text-yellow-500 hover:text-yellow-600'>
                                                <FaStar />
                                            </button>
                                        </div>

                                        {ayahText && <p className='quran text-right text-lg mb-3 leading-loose'>{ayahText}</p>}

                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => {
                                                    setSelectedSurah(surahNum);
                                                    setAyah(ayahNum);
                                                    setActiveTab('add');
                                                    fetchAyahData();
                                                }}
                                                className='text-blue-500 text-sm hover:underline'>
                                                عرض الآية
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSurah(surahNum);
                                                    setAyah(ayahNum);
                                                    playAyahAudio();
                                                }}
                                                className='text-green-500 text-sm hover:underline flex items-center gap-1'>
                                                <Play size={14} /> سماع الآية
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'quarters' && (
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    {!selectedSurahForQuarters ? (
                        <div>
                            <h2 className='text-xl font-semibold mb-6'>سور القرآن الكريم</h2>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                {surahs.map(surah => (
                                    <div key={surah.number} className='p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer text-center' onClick={() => setSelectedSurahForQuarters(surah.number)}>
                                        <h3 className='font-medium'>{surah.name}</h3>
                                        <p className='text-sm text-gray-600'>آيات: {surah.verses}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : !currentQuarter ? (
                        <div>
                            <button onClick={() => setSelectedSurahForQuarters(null)} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4'>
                                العودة إلى السور
                            </button>

                            <h2 className='text-xl font-semibold mb-6'>أرباع سورة {surahs.find(s => s.number === selectedSurahForQuarters)?.name}</h2>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {getQuartersForSurah(selectedSurahForQuarters).map((quarter, index) => (
                                    <div key={index} className='p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer' onClick={() => setCurrentQuarter(quarter)}>
                                        <h3 className='font-medium'>{quarter.name}</h3>
                                        <p className='text-sm text-gray-600'>
                                            من آية {quarter.startAyah} إلى آية {quarter.endAyah}
                                        </p>
                                        <p className="quran" > {quarter.text} </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='flex justify-between mb-4'>
                                <button onClick={() => setCurrentQuarter(null)} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
                                    العودة إلى الأرباع
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentQuarter(null);
                                        setSelectedSurahForQuarters(null);
                                    }}
                                    className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
                                    العودة إلى السور
                                </button>
                            </div>

                            <h3 className='text-lg font-bold mb-2'>{currentQuarter.name}</h3>

                            <div className='grid grid-cols-1 gap-4'>
                                {currentQuarter.verses.map((verse, index) => (
                                    <div key={index} className='p-3 border rounded bg-gray-50'>
                                        <p className='text-right text-lg mb-2'>{verse.text}</p>
                                        <p className='text-sm text-gray-600'>
                                            سورة {surahs.find(s => s.number === verse.surah)?.name} - آية {verse.ayah}
                                        </p>
                                        <div className='flex gap-2 mt-2'>
                                            <button
                                                onClick={() => {
                                                    setSelectedSurah(verse.surah);
                                                    setAyah(verse.ayah);
                                                    setActiveTab('add');
                                                    fetchAyahData();
                                                }}
                                                className='text-blue-500 text-sm hover:underline'>
                                                عرض الآية
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSurah(verse.surah);
                                                    setAyah(verse.ayah);
                                                    playAyahAudio();
                                                }}
                                                className='text-green-500 text-sm hover:underline flex items-center gap-1'>
                                                <Play size={14} /> سماع
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, color }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-800',
        green: 'bg-green-50 text-green-800',
        yellow: 'bg-yellow-50 text-yellow-800',
        red: 'bg-red-50 text-red-800',
    };

    return (
        <div className={`p-4 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
            <h3 className='font-bold mb-2'>{title}</h3>
            <p className='text-3xl font-bold'>{value}</p>
        </div>
    );
}

function TopList({ title, items }) {
    return (
        <div>
            <h3 className='font-bold mb-4'>{title}</h3>
            <div className='bg-white border rounded p-4'>
                {items.length > 0 ? (
                    items.map((item, i) => (
                        <div key={i} className='mb-2 pb-2 border-b last:border-b-0'>
                            <p className='font-medium'>{item.title}</p>
                            <p className='text-sm text-gray-600'>{item.subtitle}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 text-center py-4'>لا توجد بيانات</p>
                )}
            </div>
        </div>
    );
}

function MistakeCard({ mistake, index, incrementReview, removeMistake, isBookmarked, toggleBookmark, recordVoiceNote, voiceNote, isRecording, reviewedAnimation, playVoiceNote, isPlaying }) {
    const [tafsirText, setTafsirText] = useState('');
    const [showTafsir, setShowTafsir] = useState(false);
    const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);

    const fetchTafsir = async () => {
        if (tafsirText) {
            setShowTafsir(!showTafsir);
            return;
        }

        setIsLoadingTafsir(true);
        try {
            const response = await fetch(`https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/ar-tafsir-ibn-kathir/${mistake.surah}/${mistake.ayah}.json`);
            const data = await response.json();
            setTafsirText(data?.text || 'لا يوجد تفسير متوفر');
            setShowTafsir(true);
        } catch (error) {
            console.error('Error fetching tafsir:', error);
            setTafsirText('حدث خطأ أثناء تحميل التفسير');
        } finally {
            setIsLoadingTafsir(false);
        }
    };

    return (
        <div className={`!p-3 card2 relative overflow-hidden ${reviewedAnimation ? 'bg-green-50' : ''}`}>
            {reviewedAnimation && (
                <div className='absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center z-10'>
                    <div className='text-green-600 text-4xl animate-ping'>✓</div>
                </div>
            )}

            <div className='flex justify-between items-start gap-4'>
                <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-lg font-medium'>
                            سورة {mistake.surahName} - آية {mistake.ayah}
                        </h3>
                        <button onClick={() => toggleBookmark(mistake.surah, mistake.ayah)} className={`p-1 ${isBookmarked ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}>
                            <FaStar />
                        </button>
                    </div>

                    <p className='quran text-right text-xl mb-3 leading-loose'>{mistake.text}</p>

                    <div className='flex flex-wrap items-center gap-2  justify-between'>
                        <div className='flex gap-2'>
                            <span className='text-xs px-2 py-1 bg-gray-100 rounded'>تمت المراجعة {mistake.reviewCount} مرة</span>
                            {mistake.nextReviewDate && <span className='text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded'>المراجعة القادمة: {new Date(mistake.nextReviewDate).toLocaleDateString()}</span>}
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            <Button
                                cn='text-sm flex items-center gap-1'
                                color={!isRecording ? 'neutral' : 'error'}
                                loading={isLoadingTafsir}
                                onClick={isRecording ? () => recordVoiceNote(mistake.id, true) : fetchTafsir}
                                label={
                                    isRecording ? (
                                        <>
                                            <FaStop size={14} /> إيقاف التسجيل
                                        </>
                                    ) : showTafsir ? (
                                        'إخفاء التفسير'
                                    ) : (
                                        'عرض التفسير'
                                    )
                                }
                            />
                            <Button cn='text-sm' color='success' onClick={() => incrementReview(index)} label='تمت المراجعة' />
                            <Button cn='text-sm' color='error' onClick={() => removeMistake(index)} label='حذف' />
                        </div>
                    </div>

                    {showTafsir && (
                        <div className='mt-3 p-3 bg-gray-50 rounded border'>
                            <h4 className='font-bold mb-2'>التفسير:</h4>
                            <p className='text-sm'>{tafsirText}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
