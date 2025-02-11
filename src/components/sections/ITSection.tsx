import React from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import InfrastructureSection from './InfrastructureSection';

const ITSection = () => {
  const computerStatus = {
    labels: ['Working', 'Not Working'],
    datasets: [
      {
        data: [20, 20],
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
    labels: ['Solar', 'Grid', 'Renewable Energy'],
    datasets: [
      {
        data: [30, 50, 20],
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

export default ITSection