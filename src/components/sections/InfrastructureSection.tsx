import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

const InfrastructureSection = () => {
  const infrastructureStatus = {
    labels: [
      'Administration Block',
      'Classroom Block',
      'Computer Lab',
      'Library',
      'Kitchen',
      'Refectory',
      'Smart Classroom',
      'Dormitories',
      'Washrooms',
      'Playgrounds',
      'School Garden',
    ],
    datasets: [
      {
        label: 'Good',
        data: [60, 70, 55, 20, 18, 23, 43, 28, 46, 24, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Moderate',
        data: [10, 6, 4, 30, 10, 8, 9, 3, 4, 3, 4],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
      {
        label: 'Poor',
        data: [20, 15, 10, 8, 10, 3, 5, 16, 13, 19, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const constructionMaterials = {
    labels: [
      'Ruriba bricks',
      'Amatafari ahiye',
      'Block cement',
      'Mud bricks',
      'Mud & Wood walls',
      'Metals',
      'Iron sheets',
      'Roof tiles',
      'Tiles',
      'Cement pavement',
      'Wall Paint',
      'Steel trusses',
      'Wood trusses'
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 8, 14, 6, 9,7,13,10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
          'rgba(83, 102, 255, 0.5)',
          'rgba(40, 159, 64, 0.5)',
          'rgba(210, 199, 199, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infrastructure Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Infrastructure Status</h3>
          <Bar
            data={infrastructureStatus}
            options={{
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
            }}
          />
        </div>

        {/* Construction Materials */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Construction Materials Distribution</h3>
          <Doughnut data={constructionMaterials} />
        </div>
      </div>
    </div>
  );
};

export default InfrastructureSection