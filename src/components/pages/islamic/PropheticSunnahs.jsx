'use client';

import { useState } from 'react';

const sunnahData = [
  {
    category: 'سنن الصلاة',
    items: [
      'السواك قبل كل صلاة.',
      'الدعاء بعد التشهد الأخير.',
      'الخشوع والتأني في الأركان.',
    ],
  },
  {
    category: 'سنن الطعام',
    items: [
      'غسل اليدين قبل وبعد الأكل.',
      'التسمية قبل الطعام: "بسم الله".',
      'الأكل باليمين ومن أمامك.',
    ],
  },
  {
    category: 'سنن النوم',
    items: [
      'الوضوء قبل النوم.',
      'قراءة آية الكرسي وسور الإخلاص والمعوذتين.',
      'النوم على الشق الأيمن.',
    ],
  },
  {
    category: 'سنن يومية',
    items: [
      'ذكر الله عند الخروج من المنزل.',
      'إفشاء السلام.',
      'الابتسامة في وجه الآخرين.',
    ],
  },
  {
    category: 'سنن مهجورة',
    items: [
      'زيارة القبور للتذكير بالآخرة.',
      'قيام الليل ولو بركعتين.',
      'الصلاة في النعلين إذا كانت طاهرة.',
    ],
  },
];

export default function PropheticSunnahs() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">سنن النبي ﷺ</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {sunnahData.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeCategory === index
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border space-y-3">
        <h3 className="text-xl font-semibold text-green-700">
          {sunnahData[activeCategory].category}
        </h3>
        <ul className="list-disc pr-5 space-y-1 text-gray-700">
          {sunnahData[activeCategory].items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
