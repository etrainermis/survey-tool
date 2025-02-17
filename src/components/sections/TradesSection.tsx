import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface TradeSectionProps {
  data: any[];
}

const TradesSection: React.FC<TradeSectionProps> = ({ data }) => {
  // Process data for charts
  const processedData = React.useMemo(() => {
    if (!data?.length) return null;

    const trades = new Map();
    const genderTotals = { male: 0, female: 0 };
    const levelTotals = new Map();

    data.forEach(survey => {
      const schoolData = survey.processedData.school;
      schoolData.trades.forEach((trade: any) => {
        const tradeName = trade.trade.name;
        if (!trades.has(tradeName)) {
          trades.set(tradeName, { male: 0, female: 0 });
        }
        
        // Sum up students by gender for each trade
        trade.levels?.forEach((level: any) => {
          trades.get(tradeName).male += level.students.male;
          trades.get(tradeName).female += level.students.female;
          genderTotals.male += level.students.male;
          genderTotals.female += level.students.female;

          // Track students by level
          const levelKey = `Level ${trade.levels.indexOf(level) + 1}`;
          levelTotals.set(levelKey, (levelTotals.get(levelKey) || 0) + level.students.male + level.students.female);
        });
      });
    });

    return {
      trades: Array.from(trades.entries()),
      genderTotals,
      levelTotals: Array.from(levelTotals.entries())
    };
  }, [data]);

  const tradeData = {
    labels: processedData?.trades.map(([name]) => name) || [],
    datasets: [
      {
        label: 'Boys',
        data: processedData?.trades.map(([, data]) => data.male) || [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Girls',
        data: processedData?.trades.map(([, data]) => data.female) || [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const genderData = {
    labels: ['Boys', 'Girls'],
    datasets: [
      {
        data: [
          processedData?.genderTotals.male || 0,
          processedData?.genderTotals.female || 0
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const levelData = {
    labels: processedData?.levelTotals.map(([level]) => level) || [],
    datasets: [
      {
        label: "Students per Level",
        data: processedData?.levelTotals.map(([, count]) => count) || [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Students by Trade and Gender</h3>
        <Bar 
          data={tradeData} 
          options={{
            responsive: true,
            animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Students'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Trade'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: ${context.raw} students`;
                  }
                }
              },
              legend: {
                position: 'top',
              }
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overall Gender Distribution</h3>
          <Pie data={genderData} />
        </div>

        {/* Students per Level */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Students per Level</h3>
          <Line data={levelData} />
        </div>
      </div>
    </div>
  );
};

export default TradesSection;
