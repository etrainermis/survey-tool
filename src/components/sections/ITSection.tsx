import React from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';

interface ITSectionProps {
  data: any[];
}

const ITSection: React.FC<ITSectionProps> = ({ data }) => {
  const processedData = React.useMemo(() => {
    if (!data?.length) return null;

    const computerStats = {
      working: 0,
      notWorking: 0
    };

    const energySources = new Map();

    data.forEach(survey => {
      const it = survey.processedData.it;
      
      // Computer stats
      computerStats.working += parseInt(it.computerLab.workingComputers) || 0;
      computerStats.notWorking += parseInt(it.computerLab.nonWorkingComputers) || 0;

      // Energy sources
      it.energySources.forEach((source: string) => {
        energySources.set(source, (energySources.get(source) || 0) + 1);
      });
    });

    return {
      computerStats,
      energySources: Array.from(energySources.entries())
    };
  }, [data]);

  const computerStatus = {
    labels: ['Working', 'Not Working'],
    datasets: [
      {
        data: [
          processedData?.computerStats.working || 0,
          processedData?.computerStats.notWorking || 0
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  const connectivityData = {
    labels: ['Internet', 'Projectors', 'Server'],
    datasets: [
      {
        label: 'Yes',
        data: [15, 12, 8],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'No',
        data: [5, 8, 12],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const energySourceData = {
    labels: processedData?.energySources.map(([source]) => source) || [],
    datasets: [
      {
        data: processedData?.energySources.map(([, count]) => count) || [],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Computer Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Computer Status</h3>
          <Doughnut data={computerStatus} />
        </div>

        {/* Connectivity Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Connectivity Status</h3>
          <Bar
            data={connectivityData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        {/* Energy Sources */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Energy Sources</h3>
          <Pie data={energySourceData} />
        </div>
      </div>
    </div>
  );
};

export default ITSection;