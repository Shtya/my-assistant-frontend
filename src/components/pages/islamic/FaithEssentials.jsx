'use client';

import { useState } from 'react';

const islamicEducationData = [
  {
    category: 'التعلم والنمو الإيماني',
    description: 'مواد تعليمية شاملة لبناء أساس قوي في العقيدة الإسلامية والعمل الصالح',
    benefits: 'تقوية الإيمان - فهم الأحكام الشرعية - تطبيق الإسلام في الحياة اليومية',
    icon: '📚', 
    items: [
      {
        title: 'أركان الإسلام والإيمان',
        content: 'تعلم الأساسيات التي يقوم عليها دينك من خلال أدوات تعليمية مبسطة.',
        benefits: [
          'بناء الأساس العقائدي الصحيح',
          'تمييز الفرائض عن السنن',
          'فهم متكامل لمقومات الدين'
        ],
        targetUsers: ['المسلمون الجدد', 'الأطفال', 'المبتدئون في طلب العلم'],
        list: [
          {
            item: 'بطاقات تفاعلية تلخص أركان الإسلام والإيمان',
            features: ['تصميم جذاب', 'اختصار المعلومات', 'أمثلة عملية']
          },
          {
            item: 'فيديوهات قصيرة توضح المفاهيم الأساسية',
            features: ['رسوم متحركة', 'مدة 3-5 دقائق', 'لغة مبسطة']
          },
          {
            item: 'اختبارات بسيطة لتعزيز الفهم والتفاعل',
            features: ['أسئلة متدرجة', 'تغذية راجعة فورية', 'نظام نقاط']
          }
        ],
        recommendedTime: '10-15 دقيقة يوميًا'
      },
      {
        title: 'تعلم الصلاة',
        content: 'تعلم كيف تصلي خطوة بخطوة بطريقة سهلة ومصورة.',
        benefits: [
          'أداء الصلاة بشكل صحيح',
          'فهم شروط الصحة',
          'التمييز بين الفرض والسنن'
        ],
        targetUsers: ['المسلمون الجدد', 'الأطفال من عمر 7 سنوات', 'المقبلون على الإسلام'],
        list: [
          {
            item: 'دليل بصري يشرح كيفية الوضوء والصلاة',
            features: ['صور لكل حركة', 'توقيتات الأذكار', 'تنبيهات للأخطاء الشائعة']
          },
          {
            item: 'رسوم متحركة توضح الحركات والأذكار',
            features: ['360° عرض للحركات', 'تزامن صوتي مع الحركات', 'إمكانية التكرار']
          },
          {
            item: 'تبسيط لأحكام الصلاة للمبتدئين',
            features: ['فتاوى معتمدة', 'أسئلة شائعة', 'حالات خاصة (السفر - المرض)']
          }
        ],
        recommendedTime: 'جلسة واحدة 20 دقيقة + مراجعات'
      },
      {
        title: 'تفسير آية يوميًا',
        content: 'تأمل يومي في آية قصيرة من القرآن الكريم مع تفسيرها وفوائدها.',
        benefits: [
          'ربط بالقرآن يوميًا',
          'زيادة الفهم القرآني',
          'تطبيق عملي للآيات'
        ],
        targetUsers: ['جميع الفئات العمرية', 'طلاب العلم', 'المشغولون الذين يريدون برنامجًا يوميًا قصيرًا'],
        list: [
          {
            item: 'شرح مبسط لمعاني الآية',
            features: ['تفسير السلف', 'خرائط ذهنية', 'أمثلة معاصرة']
          },
          {
            item: 'فوائد تربوية أو إيمانية مستخلصة',
            features: ['دروس عملية', 'قصص تطبيقية', 'تمارين تفاعلية']
          },
          {
            item: 'إمكانية الاستماع للتفسير الصوتي',
            features: ['إصدار صوتي', 'إمكانية التحميل', 'إصدار قصير (3-5 دقائق)']
          }
        ],
        recommendedTime: '5 دقائق يوميًا'
      },
      {
        title: 'حديث اليوم',
        content: 'حديث نبوي يومي مع توضيح معناه وكيفية تطبيقه في الحياة اليومية.',
        benefits: [
          'الاقتداء بالنبي ﷺ',
          'فهم السنة النبوية',
          'ربط الأحاديث بالواقع المعاصر'
        ],
        targetUsers: ['الأسر المسلمة', 'المربون', 'العاملون في المجال التربوي'],
        list: [
          {
            item: 'الحديث مع تخريجه',
            features: ['ذكر المصدر', 'درجة الحديث', 'رواة الحديث']
          },
          {
            item: 'شرح مبسط للمعنى',
            features: ['شرح المفردات', 'السياق التاريخي', 'الفقه المستنبط']
          },
          {
            item: 'فائدة عملية مرتبطة بالواقع',
            features: ['نشاط تطبيقي', 'قصة معاصرة', 'ورقة عمل قابلة للتنزيل']
          }
        ],
        recommendedTime: '7 دقائق يوميًا'
      },
      {
        title: 'الفقه الميسر',
        content: 'تبسيط لأحكام العبادات بأسلوب سهل وشامل.',
        benefits: [
          'فهم الأحكام الشرعية',
          'أداء العبادات بصورة صحيحة',
          'التمييز بين الواجبات والمستحبات'
        ],
        targetUsers: ['طلاب المدارس', 'المبتدئون في الفقه', 'المسلمون في بلاد الأقليات'],
        list: [
          {
            item: 'الطهارة',
            subItems: ['أحكام الوضوء', 'فقه الغسل', 'أحكام التيمم']
          },
          {
            item: 'الصلاة',
            subItems: ['شروط الصلاة', 'أركان الصلاة', 'مبطلات الصلاة']
          },
          {
            item: 'الزكاة',
            subItems: ['أنصبة الزكاة', 'أصناف الزكاة', 'وقت إخراجها']
          },
          {
            item: 'الصيام',
            subItems: ['مبطلات الصيام', 'أحكام القضاء', 'سنن الصوم']
          }
        ],
        note: 'تعرض على هيئة أسئلة وأجوبة مختصرة مع أمثلة تطبيقية.',
        teachingMethod: {
          approach: 'التعلم بالأسئلة',
          tools: ['أمثلة من الحياة', 'فتاوى مرئية', 'اختبارات ذاتية'],
          duration: '15-30 دقيقة لكل موضوع'
        }
      }
    ],
    learningPath: {
      beginner: ['أركان الإسلام', 'تعلم الصلاة'],
      intermediate: ['تفسير آية', 'حديث اليوم'],
      advanced: ['الفقه الميسر']
    }
  }
];

export default function FaithEssentials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCategory = islamicEducationData[0];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Category Header */}
      <div className="text-center mb-8">
        <div className="inline-block text-4xl mb-2">{currentCategory.icon}</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          {currentCategory.category}
        </h2>
        <p className="text-gray-600 mb-3">{currentCategory.description}</p>
        <div className="bg-green-100 text-green-800 inline-block px-3 py-1 rounded-full text-sm">
          الفوائد: {currentCategory.benefits}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {currentCategory.items.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
              activeIndex === index
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Current Item Header */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 border-b">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            {currentCategory.items[activeIndex].title}
          </h3>
          <p className="text-gray-700 mb-3">
            {currentCategory.items[activeIndex].content}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
              الوقت المقترح: {currentCategory.items[activeIndex].recommendedTime}
            </span>
            {currentCategory.items[activeIndex].targetUsers.map((user, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                {user}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="p-6 border-b">
          <h4 className="font-semibold text-green-700 mb-3">الفوائد الأساسية:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentCategory.items[activeIndex].benefits.map((benefit, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Content */}
        <div className="p-6">
          <h4 className="font-semibold text-green-700 mb-3">المحتويات التفصيلية:</h4>
          <div className="space-y-4">
            {currentCategory.items[activeIndex].list.map((item, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">{item.item}</h5>
                {item.subItems && (
                  <ul className="list-disc pr-5 text-gray-700 space-y-1 mb-2">
                    {item.subItems.map((subItem, j) => (
                      <li key={j}>{subItem}</li>
                    ))}
                  </ul>
                )}
                {item.features && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.features.map((feature, k) => (
                      <span key={k} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        {currentCategory.items[activeIndex].note && (
          <div className="bg-yellow-50 border-t border-yellow-200 p-6">
            <h4 className="font-semibold text-yellow-800 mb-2">ملاحظة خاصة:</h4>
            <p className="text-yellow-700">{currentCategory.items[activeIndex].note}</p>
          </div>
        )}

        {/* Teaching Methodology */}
        {currentCategory.items[activeIndex].teachingMethod && (
          <div className="bg-blue-50 p-6 border-t border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">طريقة التعليم:</h4>
            <p className="text-blue-700 mb-3">
              <span className="font-medium">المنهج:</span> {currentCategory.items[activeIndex].teachingMethod.approach}
            </p>
            <div className="mb-3">
              <p className="font-medium text-blue-700 mb-1">الأدوات المستخدمة:</p>
              <div className="flex flex-wrap gap-2">
                {currentCategory.items[activeIndex].teachingMethod.tools.map((tool, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-blue-700">
              <span className="font-medium">المدة:</span> {currentCategory.items[activeIndex].teachingMethod.duration}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}