'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SelectorWithAdd from '@/components/atoms/SelectorWithAdd';

// أنواع المحتوى
const CONTENT_TYPES = {
  VIDEO: 'video',
  ARTICLE: 'article',
  COURSE: 'course',
  PODCAST: 'podcast'
};

// حالة التقدم
const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

// بيانات ثابتة
const staticData = {
  mediaItems: [
    {
      id: '1',
      title: 'مقدمة في React',
      url: 'https://example.com/react-intro',
      thumbnail: '/images/react-thumb.jpg',
      duration: 1200, // بالثواني
      type: CONTENT_TYPES.VIDEO,
      category: 'frontend',
      progress: {
        status: PROGRESS_STATUS.IN_PROGRESS,
        currentTime: 450
      }
    },
    {
      id: '2',
      title: 'أساسيات JavaScript',
      url: 'https://example.com/js-basics',
      thumbnail: '/images/js-thumb.jpg',
      duration: 1800,
      type: CONTENT_TYPES.COURSE,
      category: 'frontend',
      progress: {
        status: PROGRESS_STATUS.COMPLETED,
        currentTime: 1800
      }
    },
    {
      id: '3',
      title: 'تصميم واجهات المستخدم',
      url: 'https://example.com/ui-design',
      thumbnail: '/images/ui-thumb.jpg',
      duration: 2400,
      type: CONTENT_TYPES.VIDEO,
      category: 'design',
      progress: {
        status: PROGRESS_STATUS.NOT_STARTED,
        currentTime: 0
      }
    },
    {
      id: '4',
      title: 'أساسيات Node.js',
      url: 'https://example.com/nodejs',
      thumbnail: '/images/node-thumb.jpg',
      duration: 3600,
      type: CONTENT_TYPES.COURSE,
      category: 'backend',
      progress: {
        status: PROGRESS_STATUS.IN_PROGRESS,
        currentTime: 1200
      }
    }
  ],
  categories: [
    { id: 'frontend', name: 'تطوير الواجهات الأمامية' },
    { id: 'backend', name: 'تطوير الواجهات الخلفية' },
    { id: 'design', name: 'تصميم واجهات المستخدم' },
    { id: 'devops', name: 'DevOps' }
  ]
};

export default function MediaLibraryPage() {
  const [link, setLink] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [category, setCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل البيانات الأولية
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // جرب تحميل من localStorage أولاً
        const stored = localStorage.getItem('media-library');
        if (stored) {
          const parsed = JSON.parse(stored);
          setMediaItems(parsed.items);
          setCategories(parsed.categories);
          setIsLoading(false);
          return;
        }

        // إذا لم يوجد في localStorage، استخدم البيانات الثابتة
        setMediaItems(staticData.mediaItems);
        setCategories(staticData.categories);
        
        // حفظ في localStorage للمرة القادمة
        localStorage.setItem('media-library', JSON.stringify({
          items: staticData.mediaItems,
          categories: staticData.categories
        }));
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // حفظ التغييرات في localStorage
  useEffect(() => {
    if (mediaItems.length > 0 || categories.length > 0) {
      localStorage.setItem('media-library', JSON.stringify({
        items: mediaItems,
        categories: categories
      }));
    }
  }, [mediaItems, categories]);

  // إضافة عنصر جديد
  const handleAdd = async e => {
    e.preventDefault();
    
    if (!link) {
      alert('الرجاء إدخال رابط المحتوى');
      return;
    }

    const newItem = {
      id: `item-${Date.now()}`,
      title: `عنصر جديد ${mediaItems.length + 1}`,
      url: link,
      thumbnail: '/images/default-thumb.jpg',
      duration: 0,
      type: CONTENT_TYPES.VIDEO,
      category: category || 'uncategorized',
      progress: {
        status: PROGRESS_STATUS.NOT_STARTED,
        currentTime: 0
      }
    };

    setMediaItems([newItem, ...mediaItems]);
    
    // إضافة تصنيف جديد إذا لم يكن موجوداً
    if (category && !categories.some(c => c.id === category)) {
      setCategories([...categories, { id: category, name: category }]);
    }
    
    setLink('');
    setCategory('');
  };

  // تحديث تقدم المشاهدة
  const handleUpdateProgress = (id, currentTime) => {
    setMediaItems(mediaItems.map(item => {
      if (item.id === id) {
        const newStatus = currentTime >= item.duration ? 
          PROGRESS_STATUS.COMPLETED : 
          (currentTime > 0 ? PROGRESS_STATUS.IN_PROGRESS : PROGRESS_STATUS.NOT_STARTED);
        
        return {
          ...item,
          progress: {
            status: newStatus,
            currentTime: Math.min(currentTime, item.duration)
          }
        };
      }
      return item;
    }));
  };

  // فلترة العناصر حسب التصنيف والنوع
  // فلترة العناصر حسب التصنيف والنوع
  const filteredItems = mediaItems.filter(item => {
    const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
    const typeMatch = filterType === 'all' || item.type === filterType;
    return categoryMatch && typeMatch;
  });

  // حساب إحصائيات التقدم
  const progressStats = {
    total: mediaItems.length,
    completed: mediaItems.filter(item => item.progress.status === PROGRESS_STATUS.COMPLETED).length,
    inProgress: mediaItems.filter(item => item.progress.status === PROGRESS_STATUS.IN_PROGRESS).length,
    notStarted: mediaItems.filter(item => item.progress.status === PROGRESS_STATUS.NOT_STARTED).length,
    totalDuration: mediaItems.reduce((sum, item) => sum + item.duration, 0),
    watchedDuration: mediaItems.reduce((sum, item) => sum + item.progress.currentTime, 0)
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-100 p-6 flex items-center justify-center'>
        <div className='text-xl'>جاري تحميل المكتبة...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold mb-6 text-right'>📚 مكتبة الوسائط التعليمية</h1>

      {/* إحصائيات التقدم */}
      <div className='bg-white p-4 rounded-lg shadow mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-right'>تقدمك العام</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bg-blue-50 p-3 rounded text-center'>
            <div className='text-2xl font-bold'>{progressStats.completed}</div>
            <div className='text-gray-600'>مكتمل</div>
          </div>
          <div className='bg-yellow-50 p-3 rounded text-center'>
            <div className='text-2xl font-bold'>{progressStats.inProgress}</div>
            <div className='text-gray-600'>قيد التقدم</div>
          </div>
          <div className='bg-gray-50 p-3 rounded text-center'>
            <div className='text-2xl font-bold'>{progressStats.notStarted}</div>
            <div className='text-gray-600'>لم يبدأ بعد</div>
          </div>
          <div className='bg-green-50 p-3 rounded text-center'>
            <div className='text-2xl font-bold'>
              {Math.round((progressStats.watchedDuration / progressStats.totalDuration) * 100)}%
            </div>
            <div className='text-gray-600'>إجمالي التقدم</div>
          </div>
        </div>
      </div>

      {/* نموذج إضافة عنصر جديد */}
      <form onSubmit={handleAdd} className='flex flex-col sm:flex-row gap-3 mb-6'>
        <input 
          type='text' 
          value={link} 
          onChange={e => setLink(e.target.value)} 
          placeholder='أدخل رابط المحتوى...' 
          className='flex-1 px-4 py-2 border border-gray-300 rounded text-right' 
          required
        />
        <SelectorWithAdd 
          cn='max-w-md w-full' 
          categories={categories.map(c => c.id)} 
          selected={category} 
          onChange={setCategory} 
        />
        <button 
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          إضافة
        </button>
      </form>

      {/* الفلاتر */}
      <div className='flex flex-wrap gap-4 mb-6'>
        {/* فلترة حسب التصنيف */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1 text-right'>التصنيف</label>
          <select 
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded text-right'
          >
            <option value='all'>الكل</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* فلترة حسب النوع */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1 text-right'>نوع المحتوى</label>
          <select 
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded text-right'
          >
            <option value='all'>الكل</option>
            <option value={CONTENT_TYPES.VIDEO}>فيديو</option>
            <option value={CONTENT_TYPES.COURSE}>كورس</option>
            <option value={CONTENT_TYPES.ARTICLE}>مقال</option>
            <option value={CONTENT_TYPES.PODCAST}>بودكاست</option>
          </select>
        </div>
      </div>

      {/* قائمة العناصر */}
      {filteredItems.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-gray-500'>
            لا توجد عناصر مطابقة للفلاتر المحددة.
          </p>
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div 
                key={item.id} 
                layout 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className='bg-white shadow-md rounded-lg overflow-hidden'
              >
                {/* صورة المصغرة */}
                <div className='aspect-video bg-gray-200 relative'>
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className='w-full h-full object-cover'
                  />
                  {item.progress.status === PROGRESS_STATUS.COMPLETED && (
                    <div className='absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded'>
                      مكتمل
                    </div>
                  )}
                </div>
                
                {/* معلومات العنصر */}
                <div className='p-4'>
                  <h2 className='text-lg font-semibold mb-2 text-right'>{item.title}</h2>
                  
                  {/* شريط التقدم */}
                  <div className='mb-3'>
                    <div className='flex justify-between text-sm text-gray-600 mb-1'>
                      <span>
                        {Math.floor(item.progress.currentTime / 60)} دقيقة من {Math.floor(item.duration / 60)} دقيقة
                      </span>
                      <span>
                        {Math.round((item.progress.currentTime / item.duration) * 100)}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2.5'>
                      <div 
                        className={`h-2.5 rounded-full ${
                          item.progress.status === PROGRESS_STATUS.COMPLETED ? 'bg-green-500' : 
                          item.progress.status === PROGRESS_STATUS.IN_PROGRESS ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        style={{ width: `${Math.round((item.progress.currentTime / item.duration) * 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* التحكم في التقدم */}
                  <div className='flex justify-between mb-3'>
                    <button
                      onClick={() => handleUpdateProgress(item.id, Math.max(0, item.progress.currentTime - 300))}
                      className='text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300'
                    >
                      -5 دقائق
                    </button>
                    <button
                      onClick={() => {
                        const newTime = prompt('أدخل الوقت الحالي بالثواني:', item.progress.currentTime);
                        if (newTime !== null && !isNaN(newTime)) {
                          handleUpdateProgress(item.id, parseInt(newTime));
                        }
                      }}
                      className='text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200'
                    >
                      تحديث الوقت
                    </button>
                    <button
                      onClick={() => handleUpdateProgress(item.id, Math.min(item.duration, item.progress.currentTime + 300))}
                      className='text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300'
                    >
                      +5 دقائق
                    </button>
                  </div>
                  
                  {/* معلومات إضافية */}
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-gray-500'>
                      {categories.find(c => c.id === item.category)?.name || item.category}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      item.type === CONTENT_TYPES.VIDEO ? 'bg-blue-100 text-blue-800' :
                      item.type === CONTENT_TYPES.COURSE ? 'bg-purple-100 text-purple-800' :
                      item.type === CONTENT_TYPES.ARTICLE ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.type === CONTENT_TYPES.VIDEO ? 'فيديو' :
                       item.type === CONTENT_TYPES.COURSE ? 'كورس' :
                       item.type === CONTENT_TYPES.ARTICLE ? 'مقال' : 'بودكاست'}
                    </span>
                  </div>
                  
                  {/* زر المشاهدة */}
                  <div className='mt-3'>
                    <a 
                      href={item.url} 
                      target='_blank' 
                      rel='noopener noreferrer'
                      className='block text-center text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700'
                    >
                      الذهاب للمحتوى
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}