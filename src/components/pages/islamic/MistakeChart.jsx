import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MistakeChart = ({ mistakes, surahs }) => {
  // Process data to count mistakes by surah
  const processData = () => {
    const mistakeCountBySurah = {};
    
    // Initialize counts for all surahs
    surahs.forEach(surah => {
      mistakeCountBySurah[surah.number] = {
        name: surah.name,
        count: 0
      };
    });
    
    // Count mistakes
    mistakes.forEach(mistake => {
      if (mistakeCountBySurah[mistake.surah]) {
        mistakeCountBySurah[mistake.surah].count++;
      }
    });
    
    // Filter to only show surahs with mistakes
    const filteredData = Object.values(mistakeCountBySurah)
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
    
    return filteredData;
  };

  const chartData = processData();
  
  // Prepare data for ChartJS
  const data = {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        label: 'عدد الأخطاء',
        data: chartData.map(item => item.count),
        backgroundColor: '#ef4444',
        borderColor: 'rgba(75, 192, 192, 1)',
        // borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        rtl: true,
		display : false
      },
      title: {
        display: false,
        text: 'توزيع الأخطاء حسب السور',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'عدد الأخطاء'
        }
      },
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '400px', direction: 'rtl' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MistakeChart;