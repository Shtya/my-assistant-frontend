export const fetchPrayerTimes = async (lat, lng) => {
  try {
    const date = new Date();
    const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const response = await fetch(`https://api.aladhan.com/v1/timings/${today}?latitude=${lat}&longitude=${lng}&method=5`);
    const data = await response.json();
    console.log(data)
    return data.data.timings;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

export const calculateTimeRemaining = (diff) => {
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
};

export const scheduleNotification = (prayerTime, prayerName, minutesBefore, callback) => {
  const notificationTime = new Date(prayerTime.getTime() - minutesBefore * 60000);
  const now = new Date();
  
  if (notificationTime > now) {
    const timeout = notificationTime - now;
    setTimeout(() => {
      callback({
        title: 'تذكير بالصلاة',
        message: `حان وقت الاستعداد لصلاة ${prayerName}`,
        translation: `بقي ${minutesBefore} دقيقة لصلاة ${prayerName}`,
        benefits: 'الاستعداد للصلاة من علامات تقوى القلب'
      });
    }, timeout);
  }
};