"use client"
import { useState, useEffect } from 'react';
import quotesData from '@/data/quotes.json';

const motivations = {
  Fajr: {
    title: "لماذا تصلي الفجر؟",
    reasons: [
      "صلاة الفجر مشهودة تشهدها الملائكة",
      "من صلى الفجر في جماعة فهو في ذمة الله",
      "صلاة الفجر تمنحك بركة في يومك"
    ]
  },
  Dhuhr: {
    title: "لماذا تصلي الظهر؟",
    reasons: [
      "الصلاة في وقتها من أحب الأعمال إلى الله",
      "تذكرك بالله في وسط انشغالات النهار",
      "تجدد نشاطك وتركيزك"
    ]
  },
  // Add for other prayers...
};

export default function Motivation() {
  const [activeMotivation, setActiveMotivation] = useState(null);
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    // Set random quote on load
    setRandomQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
    
    // Change quote every hour
    const interval = setInterval(() => {
      setRandomQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
    }, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const showPrayerMotivation = (prayer) => {
    setActiveMotivation(motivations[prayer]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-green-800">تذكير وتحفيز</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {Object.keys(motivations).map(prayer => (
          <button
            key={prayer}
            onClick={() => showPrayerMotivation(prayer)}
            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm"
          >
            {prayer === 'Fajr' ? 'الفجر' : 
             prayer === 'Dhuhr' ? 'الظهر' : 
             prayer === 'Asr' ? 'العصر' : 
             prayer === 'Maghrib' ? 'المغرب' : 'العشاء'}
          </button>
        ))}
      </div>
      
      {activeMotivation ? (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-bold text-lg text-green-800 mb-2">{activeMotivation.title}</h3>
          <ul className="list-disc pl-5 space-y-2">
            {activeMotivation.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-lg text-blue-800 mb-2">حديث اليوم</h3>
          <p className="mb-2">{randomQuote?.text}</p>
          <p className="text-sm text-gray-600">{randomQuote?.reference}</p>
        </div>
      )}
      
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-bold text-lg text-yellow-800 mb-2">تذكير بالأذكار</h3>
        <p>لا تنسى أذكار الصباح والمساء، فهي حصنك من الشيطان وزيادة في حسناتك.</p>
      </div>
    </div>
  );
}