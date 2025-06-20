'use client';

import { useState } from 'react';

const data = [
  {
    category: 'تصحيحات شرعية',
    items: [
      {
        title: 'بدع منتشرة',
        content: 'ممارسات لا أصل لها في الشرع يظنها الناس من الدين، يجب الحذر منها.',
        list: [
          'الاحتفال بليلة النصف من شعبان.',
          'قراءة الفاتحة بعد كل صلاة جماعة بشكل جماعي.',
          'التبرك بالأضرحة والأحجار والأشجار.'
        ]
      },
      {
        title: 'أحاديث مكذوبة',
        content: 'أحاديث لا تصح نُسبت للنبي ﷺ وهي منتشرة بكثرة بين الناس.',
        list: [
          '"اطلبوا العلم ولو في الصين" — لا أصل له.',
          '"من لم تنهه صلاته عن الفحشاء والمنكر فلا صلاة له" — مكذوب.',
          '"أنا مدينة العلم وعلي بابها" — موضوع.'
        ]
      },
      {
        title: 'أحاديث ضعيفة مشهورة',
        content: 'أحاديث منتشرة لكنها لا تصح عن النبي ﷺ، وبعضها ضعيف أو منكر.',
        list: [
          '"الدعاء مخ العبادة" — ضعيف.',
          '"صوموا تصحوا" — ضعيف.',
          '"الجمعة إلى الجمعة كفارة لما بينهما" — فيه ضعف في بعض رواياته.'
        ]
      },
      {
        title: 'أخطاء في أركان العبادات',
        content: 'بيان لأبرز الأخطاء المنتشرة في أداء أركان الإسلام الخمسة.',
        list: [
          'الشهادتان: الجهل بمعناها، الحلف بغير الله.',
          'الصلاة: تأخيرها عن وقتها، الحركات الزائدة، قراءة غير صحيحة.',
          'الزكاة: عدم معرفة النصاب، أو إعطاؤها لغير مستحقيها.',
          'الصيام: الغيبة، السب، عدم الإمساك التام عن المفطرات المعنوية.',
          'الحج: الجهل بالمناسك، ارتكاب بدع مثل التمسح بجدران الكعبة.'
        ]
      }
    ]
  }
];

export default function IslamicCorrections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCategory = data[0];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
        {currentCategory.category}
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {currentCategory.items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeIndex === index
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4 border">
        <h3 className="text-xl font-semibold text-red-700">
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
