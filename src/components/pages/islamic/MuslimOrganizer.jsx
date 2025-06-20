'use client';

import { useState } from 'react';

const organizerData = [
  {
    category: 'منظم المسلم',
    items: [
      {
        title: '📅 مخطط حياة المسلم',
        content: 'تابع أداءك اليومي من صلاة، وقراءة للقرآن، وأذكار.',
        list: [
          'سجل كل يوم: هل صليت؟ هل قرأت وردك؟ هل ذكرت الله؟',
          'واجهة تفاعلية للسحب أو التعليم عند الإنجاز.',
          'نظام تذكير يومي لعدم النسيان.',
        ],
      },
      {
        title: 'أوضاع خاصة للمواسم',
        content: 'تنشيط أوضاع خاصة للمواسم التعبدية مثل رمضان وغيرها.',
        list: [
          'وضع رمضان: متابعة الصيام، التراويح، قراءة القرآن.',
          'عشر ذي الحجة: أعمال الأيام العشر والنية.',
          'أيام البيض: تذكير بالصيام وتسجيل الأداء.',
        ],
      },
      {
        title: '📆 التقويم الهجري والميلادي',
        content: 'تقويم يعرض المناسبات الإسلامية بشكل بصري.',
        list: [
          'يعرض الأيام الهجرية والميلادية.',
          'تنبيهات تلقائية للمناسبات الدينية.',
          'إمكانية تخصيص مواعيد خاصة.',
        ],
      },
      {
        title: '🎯 قائمة أهداف دينية',
        content: 'حدد أهدافك الإيمانية وتابع تقدمك.',
        list: [
          'ختم القرآن (بالتقسيم اليومي أو الأسبوعي).',
          'حفظ سور معينة مع نظام مراجعة.',
          'صيام نوافل مثل الإثنين والخميس، الأيام البيض، عرفة.',
        ],
      },
    ],
  },
];

export default function MuslimOrganizer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCategory = organizerData[0];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        {currentCategory.category}
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {currentCategory.items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeIndex === index
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4 border">
        <h3 className="text-xl font-semibold text-green-700">
          {currentCategory.items[activeIndex].title}
        </h3>
        <p className="text-gray-700">{currentCategory.items[activeIndex].content}</p>

        {currentCategory.items[activeIndex].list && (
          <ul className="list-disc pr-5 text-gray-700 space-y-1">
            {currentCategory.items[activeIndex].list.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
